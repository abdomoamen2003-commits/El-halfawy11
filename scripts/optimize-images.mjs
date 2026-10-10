/**
 * Image pipeline: assets-src/img (masters)  ->  src/assets/img (WebP, responsive widths)
 *
 *  - JPEG photos  -> WebP at several widths (never upscaled)   e.g. hero-480.webp, hero-800.webp, hero-1120.webp
 *  - PNG logos    -> lossless WebP (keeps transparency + crisp edges)
 *  - Also writes favicons into /public
 *
 * Run:  npm run images
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets-src/img";
const OUT = "src/assets/img";
const WIDTHS = [480, 800, 1200];
const QUALITY = 78;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)],
  );

const manifest = {};
let before = 0;
let after = 0;

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const { dir, name, ext } = path.parse(rel);
  const outDir = path.join(OUT, dir);
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(file).metadata();
  before += fs.statSync(file).size;

  if (ext.toLowerCase() === ".png") {
    const out = path.join(outDir, `${name}.webp`);
    await sharp(file).webp({ lossless: true, effort: 6 }).toFile(out);
    after += fs.statSync(out).size;
    manifest[path.join(dir, name).split(path.sep).join("/")] = { width: meta.width, height: meta.height, widths: [meta.width], single: true };
    continue;
  }

  // single-size textures (CSS backgrounds) are not responsive <img> sources
  if (name.startsWith("bp-")) {
    const out = path.join(outDir, `${name}.webp`);
    await sharp(file).webp({ quality: 72, effort: 6 }).toFile(out);
    after += fs.statSync(out).size;
    manifest[name] = { width: meta.width, height: meta.height, widths: [meta.width], single: true };
    continue;
  }

  const sizes = [...new Set([...WIDTHS.filter((w) => w < meta.width), meta.width])];
  for (const w of sizes) {
    const out = path.join(outDir, `${name}-${w}.webp`);
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 6 }).toFile(out);
    after += fs.statSync(out).size;
  }
  manifest[path.join(dir, name).split(path.sep).join("/")] = { width: meta.width, height: meta.height, widths: sizes };
}

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 1));

// favicons (from the brand mark)
const mark = "assets-src/img/logo-mark.png";
await sharp(mark).resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile("public/icon-192.png");
await sharp(mark).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile("public/favicon-32.png");
await sharp(mark).resize(180, 180, { fit: "contain", background: "#ffffff" }).png().toFile("public/apple-touch-icon.png");

console.log(`masters: ${(before / 1024).toFixed(0)} KB  ->  optimized (all sizes): ${(after / 1024).toFixed(0)} KB`);

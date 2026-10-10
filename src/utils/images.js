/**
 * Responsive image registry.
 *
 * `npm run images` converts the masters in /assets-src/img into WebP files with several widths
 * (src/assets/img/<name>-<width>.webp) and writes manifest.json with the natural sizes.
 * Vite fingerprints every file, so they are cached forever by the browser.
 */
import manifest from "../assets/img/manifest.json";

const urls = import.meta.glob("../assets/img/**/*.webp", { eager: true, query: "?url", import: "default" });
const url = (file) => urls[`../assets/img/${file}.webp`];

const normalise = (name) => name.replace(/\.(jpe?g|png|webp)$/i, "");

export function getImage(name) {
  const key = normalise(name);
  const meta = manifest[key];
  if (!meta) return null;

  // single-file images (logos)
  if (meta.widths.length === 1 && meta.single) {
    return { src: url(key), width: meta.width, height: meta.height };
  }

  const srcSet = meta.widths.map((w) => `${url(`${key}-${w}`)} ${w}w`).join(", ");
  const largest = meta.widths[meta.widths.length - 1];
  return { src: url(`${key}-${largest}`), srcSet, width: meta.width, height: meta.height };
}

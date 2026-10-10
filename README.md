# El Halfawy — Architecture & General Contracting (website)

Production-ready React single-page site. Visual identity, copy and behaviour are unchanged from the original
single-file build; the code base is now a real, maintainable project and loads far faster.

| Stack | Version |
|---|---|
| React / React DOM | 18.3.1 |
| React Router | 7.18.4 (hash routing by default) |
| GSAP + ScrollTrigger | 3.15 |
| AOS | 2.3.4 |
| Tailwind CSS | 3.4 |
| lucide-react | icons |
| Vite | 5 (build) |
| Font | Plus Jakarta Sans (self-hosted, variable, `@fontsource-variable`) |

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/  (JS/CSS also emitted as .gz and .br)
npm run preview    # serve the production build locally
npm run lint
npm run images     # re-generate responsive WebP files from assets-src/img
```

## Project structure

```
assets-src/img/          original image masters (never shipped)
public/                  favicons
nginx/elhalfawy.conf     production server block (gzip_static, caching, SPA fallback, security headers, CSP)
scripts/optimize-images.mjs
src/
  assets/img/            generated WebP (several widths) + manifest.json
  components/
    common/              Img, Section, SectionTitle, PageHeader, ClientCard, Counter, LazyMap, RoofMark
    layout/              Layout, Header, Footer, PageTransition, PageEffects
    sections/            Hero, FeaturedProjects, ClientsSection, AboutRows, ContactForm, LocationMap
  pages/                 one lazy-loaded file per route (+ NotFoundPage)
  data/                  site.js, content.js, projects.js, clients.js   <- edit text/contact details here
  lib/                   gsap.js, reveal.js, scrollRefresh.js
  styles/                index.css (Tailwind + components), motion.css (reveals, glows, navbar, loader, form)
  utils/                 images.js, motion.js, preload.js
```

### Editing content
* Company phone / e-mail / map query / hero taglines: `src/data/site.js`
* Services, industries, about text: `src/data/content.js`   · Projects: `src/data/projects.js`   · Clients: `src/data/clients.js`
* New photo: put the JPG/PNG in `assets-src/img/`, run `npm run images`, reference it by name (`<Img name="photo" />`).

## Routing modes
* **Default: hash routing** (`/#/about`) — works on any static host with zero configuration (same URLs as before).
* **Clean URLs:** build with `VITE_ROUTER=browser npm run build` (`npm run build:browser-router`) and use the Nginx config.
  Unknown paths then fall back to `index.html` and the in-app 404 page is shown.

## Deployment (Ubuntu + Nginx)
1. `npm ci && npm run build`
2. Copy `dist/` to `/var/www/elhalfawy/dist`
3. Copy `nginx/elhalfawy.conf` to `/etc/nginx/conf.d/` (or sites-available), set `server_name`, `nginx -t && systemctl reload nginx`.

The config serves the pre-compressed `.gz` files (`gzip_static on`), caches `/assets/*` for one year (`immutable`, file names are
content-hashed), never caches `index.html`, returns a real 404 for missing assets, blocks dotfiles and sets security headers + CSP.
Brotli: the `.br` files are emitted; enable them with `brotli_static on;` if your Nginx build has `ngx_brotli`
(stock Nginx 1.18 does not — gzip is used instead).

## Performance work (what changed and why)
| Area | Original | Now |
|---|---|---|
| Delivery | one 6.2 MB HTML (images as base64, JS inline) – nothing cacheable | hashed, cacheable, code-split files; route chunks load on demand (GSAP only on the Home page) |
| Images | 4.3 MB base64 inside the page, 4 unused files (560 KB) | WebP, 2–4 widths each via `srcset/sizes`, natural `width/height` (no layout shift), lazy-loaded, hero preloaded |
| Fonts | Google Fonts (5 weights, render-blocking, 3rd-party) | self-hosted variable WOFF2, latin subset only (27 KB) |
| Google Maps | iframe rendered with the page | mounted only when within 400 px of the viewport (`LazyMap`) |
| Scroll smoothness | MutationObserver + 700 ms polling re-scanning the DOM, layout reads on every scroll event, endless animated full-section glows, `backdrop-filter` on every card, replaying animations | IntersectionObserver reveals (once), one rAF-throttled scroll handler with cached sizes, glows animate only while visible (and not on phones), no blur on cards/nav, `once:true` |
| Page width on phones | layout was 16–20 % wider than the screen (glow pseudo-elements) | `contain: paint` keeps glows inside their sections |
| Reduced motion | content stayed hidden for visitors with “reduce motion” | content visible, extra choreography skipped |

## Accessibility & quality
Skip-to-content link, visible `:focus-visible` ring, `aria-expanded/controls` + `inert` closed mobile menu, larger touch targets
(menu button, slider dots) without changing the look, labelled form fields with `role="alert"` errors and honeypot,
correct `key`s, in-app 404 page, `lang`, meta description, theme colour, favicons.

## Notes
* The contact form posts to **formsubmit.co** using the company e-mail (as before). The first submission triggers FormSubmit's
  one-time activation e-mail. To hide the address from page source, create a FormSubmit alias and put it in `siteConfig.email`.
* Google Maps is embedded without an API key (no secret in the front-end).

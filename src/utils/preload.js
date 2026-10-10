import { getImage } from "./images";

const HASH_MODE = import.meta.env.VITE_ROUTER !== "browser";

const isHome = () =>
  HASH_MODE ? !window.location.hash || window.location.hash === "#/" : window.location.pathname === "/";

/**
 * Warm up the landing page before React has even rendered:
 *  - starts downloading the Home route chunk (otherwise it is only requested after the router resolves), and
 *  - preloads the responsive hero image so it is not discovered late (best Largest-Contentful-Paint).
 */
export function warmUpLandingPage() {
  if (!isHome()) return;
  import("../pages/HomePage");

  const hero = getImage("hero");
  if (!hero) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = hero.src;
  if (hero.srcSet) {
    link.setAttribute("imagesrcset", hero.srcSet);
    link.setAttribute("imagesizes", "100vw");
  }
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
}

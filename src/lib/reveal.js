/**
 * Scroll-reveal layer (clip-path unmask of images, staggered lists, ambient background glows).
 *
 * Replaces the old global MutationObserver + 700 ms polling script. It now runs once per page mount (see
 * PageEffects), uses IntersectionObserver only, reveals each element ONCE and then stops observing it, so
 * scrolling never triggers extra style/layout work.
 */
import { prefersReducedMotion } from "../utils/motion";

const STAGGERED = ["footer>div>div", "footer>p", "main dl>div", "main ul.space-y-3>li", "main form>div", "main .mt-4.flex.gap-3>button"];
const BACKGROUNDS = "section.bp,section.bp-light,footer,main>header";

const seen = new WeakSet();
const wrappers = new WeakMap(); // observed wrapper -> elements to reveal
let revealObserver = null;
let liveObserver = null;
let listenersReady = false;

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.12) return;
          (wrappers.get(entry.target) || [entry.target]).forEach((el) => el.setAttribute("data-mx", "in"));
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.12] },
    );
  }
  return revealObserver;
}

/** Ambient glows only animate while their section is on screen. */
function getLiveObserver() {
  if (!liveObserver) {
    liveObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-live", e.isIntersecting)),
      { rootMargin: "120px" },
    );
  }
  return liveObserver;
}

const indexOf = (el) => Array.prototype.indexOf.call(el.parentNode.children, el);

function prepare(el, delay) {
  if (seen.has(el)) return;
  seen.add(el);
  el.setAttribute("data-mx", "pre");
  el.style.setProperty("--mx-d", Math.min(delay, 0.6).toFixed(2) + "s");

  // safety net: if the observer never fires (e.g. print, odd layouts) make sure nothing stays hidden
  setTimeout(() => {
    if (el.getAttribute("data-mx") !== "pre") return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.setAttribute("data-mx", "in");
  }, 2500);

  // a fully clipped element has no visible area, so observe its wrapper instead
  const target = el.classList.contains("imgbox") && el.parentElement ? el.parentElement : el;
  const list = wrappers.get(target) || [];
  list.push(el);
  wrappers.set(target, list);
  getRevealObserver().observe(target);
}

/** After an AOS entrance finishes, hover transitions must not inherit the stagger delay. */
function setupDelegatedListeners() {
  if (listenersReady) return;
  listenersReady = true;
  document.addEventListener(
    "transitionend",
    (e) => {
      const el = e.target;
      if (el && el.hasAttribute && el.hasAttribute("data-aos") && e.propertyName === "opacity") {
        if (el.classList.contains("aos-animate")) el.setAttribute("data-mx-done", "");
        else el.removeAttribute("data-mx-done");
      }
    },
    true,
  );
  addEventListener("beforeprint", () => {
    document.querySelectorAll("[data-mx=pre]").forEach((el) => el.setAttribute("data-mx", "in"));
  });
}

export function scanReveals() {
  if (prefersReducedMotion() || !document.documentElement.classList.contains("mx")) return;
  setupDelegatedListeners();

  document.querySelectorAll(BACKGROUNDS).forEach((el) => {
    if (!seen.has(el)) {
      seen.add(el);
      getLiveObserver().observe(el);
    }
  });

  document.querySelectorAll(".imgbox").forEach((el) => {
    const aos = el.closest("[data-aos]");
    const delay = aos ? parseInt(aos.getAttribute("data-aos-delay") || "0", 10) / 1000 : 0;
    prepare(el, delay + 0.2);
  });
  STAGGERED.forEach((selector) => document.querySelectorAll(selector).forEach((el) => prepare(el, indexOf(el) * 0.09)));
  document.querySelectorAll("[data-reveal]").forEach((el) => prepare(el, indexOf(el) * 0.09));
  document.querySelectorAll("[data-stagger]>*").forEach((el) => prepare(el, indexOf(el) * 0.09));
}

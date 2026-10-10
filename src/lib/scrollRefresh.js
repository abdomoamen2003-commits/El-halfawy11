/**
 * GSAP/ScrollTrigger is only downloaded on pages that use it. This tiny registry lets the shared layout ask for a
 * ScrollTrigger refresh without importing GSAP into the main bundle.
 */
let refresher = null;
export const registerScrollRefresh = (fn) => {
  refresher = fn;
};
export const refreshScrollTriggers = () => refresher && refresher();

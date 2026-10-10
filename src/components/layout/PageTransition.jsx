import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { prefersReducedMotion } from "../../utils/motion";

const HASH_MODE = import.meta.env.VITE_ROUTER !== "browser";

/** Resolve a clicked <a> to an in-app route ("/about") or null when it is not an internal navigation. */
function internalTarget(anchor) {
  if (HASH_MODE) {
    const href = anchor.getAttribute("href") || "";
    return href.startsWith("#/") ? href.slice(1) : null;
  }
  if (anchor.origin !== window.location.origin) return null;
  return anchor.pathname + anchor.search + anchor.hash;
}

/**
 * Page-to-page loader: a dim overlay with the orange spinner fades in on link click, the route changes underneath
 * it and the overlay fades out again (also on browser back/forward).
 */
export default function PageTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const [on, setOn] = useState(false);
  const busy = useRef(false);
  const hideTimer = useRef(0);
  const here = useRef("");
  const first = useRef(true);

  here.current = location.pathname + location.search + location.hash;

  const show = () => {
    clearTimeout(hideTimer.current);
    setOn(true);
    hideTimer.current = setTimeout(hide, 2500); // safety: never stay on
  };
  const hide = () => {
    clearTimeout(hideTimer.current);
    setOn(false);
    busy.current = false;
  };

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target.closest && e.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const to = internalTarget(anchor);
      if (!to || to === here.current || busy.current) return;
      e.preventDefault();
      e.stopPropagation();
      busy.current = true;
      show();
      setTimeout(() => navigate(to), 320);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // route changed (link click, back or forward): keep the overlay a moment while the new page paints
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    if (!busy.current) show();
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(hide, 520);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div id="mx-loader" aria-hidden="true" className={on ? "on" : ""}>
      <i />
    </div>
  );
}

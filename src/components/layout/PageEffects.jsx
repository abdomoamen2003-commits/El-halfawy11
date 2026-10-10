import { useEffect } from "react";
import AOS from "aos";
import { scanReveals } from "../../lib/reveal";
import { refreshScrollTriggers } from "../../lib/scrollRefresh";

/** Mounted together with every route element: wires scroll-reveals and refreshes AOS / ScrollTrigger once. */
export default function PageEffects() {
  useEffect(() => {
    const frame = requestAnimationFrame(scanReveals);
    const timer = setTimeout(() => {
      AOS.refreshHard();
      refreshScrollTriggers();
    }, 150);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);
  return null;
}

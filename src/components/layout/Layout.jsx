import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Site shell: header, page outlet, footer, reading-progress bar and back-to-top button.
 *
 * All scroll-driven UI shares ONE passive listener that is throttled with requestAnimationFrame; the document height
 * is cached (ResizeObserver) so scrolling never forces a synchronous layout.
 */
export default function Layout() {
  const { pathname } = useLocation();
  const progressRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // every route starts at the top
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    let maxScroll = 0;
    let ticking = false;
    let headerImg = null;

    const measure = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0})`;
      setScrolled(y > 30);
      setShowTop(y > 800);

      // light parallax on the inner-page banner image (desktop only)
      if (!headerImg || !headerImg.isConnected) headerImg = document.querySelector("main>header>img");
      if (headerImg) {
        headerImg.style.transform =
          window.innerWidth < 768 || y > 900 ? "" : `translate3d(0,${Math.min(y * 0.12, 26).toFixed(1)}px,0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const skipToContent = (e) => {
    e.preventDefault();
    document.getElementById("main")?.focus();
  };

  return (
    <>
      <a
        href="#main"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-teal-900"
      >
        Skip to content
      </a>
      <div ref={progressRef} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left scale-x-0 bg-accent" />
      <Header scrolled={scrolled} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 rounded-full bg-accent p-3 text-teal-900 shadow-xl transition-all duration-300 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp />
      </button>
    </>
  );
}

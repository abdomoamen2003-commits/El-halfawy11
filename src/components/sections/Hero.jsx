import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Img from "../common/Img";
import { taglines } from "../../data/site";
import { prefersReducedMotion } from "../../utils/motion";

const TITLE_GRADIENT = "linear-gradient(90deg,#ffffff 0%,#38A6BD 45%,#EC9510 100%)";

/** Typing / deleting tagline. Isolated so only this tiny component re-renders every few milliseconds. */
function Typewriter({ lines }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let line = 0;
    let length = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const current = lines[line];
      length += deleting ? -1 : 1;
      setText(current.slice(0, length));
      if (!deleting && length === current.length) {
        deleting = true;
        timer = setTimeout(tick, 1800);
        return;
      }
      if (deleting && length === 0) {
        deleting = false;
        line = (line + 1) % lines.length;
      }
      timer = setTimeout(tick, deleting ? 28 : 65);
    };
    tick();
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <>
      {text}
      <span className="cursor" />
    </>
  );
}

/**
 * One continuous white -> blue -> orange gradient across all letters of the hero title.
 * All layout reads happen first, all style writes afterwards (no forced reflow), and only once per resize/font load.
 */
function paintTitleGradient(title) {
  const chars = [...title.querySelectorAll(".char")];
  if (!chars.length) return;
  const boxes = chars.map((c) => [c.offsetLeft, c.offsetWidth]); // reads
  const min = Math.min(...boxes.map(([left]) => left));
  const max = Math.max(...boxes.map(([left, width]) => left + width));
  const width = Math.max(max - min, 1);
  chars.forEach((c, i) => {
    // writes
    const s = c.style;
    s.backgroundImage = TITLE_GRADIENT;
    s.backgroundSize = `${width}px 100%`;
    s.backgroundRepeat = "no-repeat";
    s.backgroundPosition = `${-(boxes[i][0] - min)}px 0`;
    s.webkitBackgroundClip = "text";
    s.backgroundClip = "text";
    s.color = "transparent";
    s.webkitTextFillColor = "transparent";
  });
}

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // gradient lettering (after fonts are ready and on resize)
  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title || !(CSS.supports("background-clip", "text") || CSS.supports("-webkit-background-clip", "text"))) return undefined;
    let frame = 0;
    const paint = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => paintTitleGradient(title));
    };
    paint();
    document.fonts?.ready.then(paint);
    window.addEventListener("resize", paint);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", paint);
    };
  }, []);

  // entrance timeline + background parallax
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let intro;
    const ctx = gsap.context(() => {
      intro = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".char", { yPercent: 115, rotate: 6, duration: 1.1, stagger: 0.045 })
        .from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.9 }, "-=0.6")
        .from(".hero-fade", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.6");

      gsap.to(".hero-img", {
        yPercent: 8,
        scale: 1.04,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // replay the intro when the visitor scrolls back up to the hero
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom 40%",
        onEnterBack: () => intro && intro.restart(),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-teal-900 pb-16 pt-32 text-white md:pt-36"
    >
      <Img name="hero" alt="" priority sizes="100vw" className="hero-img absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/95 via-teal-800/80 to-teal-600/55" />
      <div className="bp absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <h1 ref={titleRef} className="t-hero flex flex-wrap items-end gap-x-[.28em]" aria-label="El Halfawy">
          {["El", "Halfawy"].map((word, i) => (
            <span
              key={word}
              className={`inline-block overflow-hidden pb-[.12em] ${i ? "text-brand" : "text-white"}`}
              aria-hidden
            >
              {[...word].map((letter, j) => (
                <span key={j} className="char">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="hero-line mt-6 h-1 w-32 bg-accent" />
        <p className="hero-fade mt-6 min-h-[2.2rem] text-2xl font-semibold md:text-3xl">
          <Typewriter lines={taglines} />
        </p>
        <p className="hero-fade mt-3 max-w-xl text-lg text-white/80">
          Construction services with the highest quality and professionalism, from foundations to final finishes.
        </p>
        <div className="hero-fade mt-10 flex flex-wrap gap-4">
          <Link to="/contact" className="btn-outline">
            Contact Us <ArrowRight size={20} />
          </Link>
          <Link to="/projects" className="btn-ghost">
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

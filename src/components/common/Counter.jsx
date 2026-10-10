import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";

/** Animated "0 -> N+" statistic that counts up every time it scrolls into view. */
export default function Counter({ to, label }) {
  const numberRef = useRef(null);

  useEffect(() => {
    const state = { value: 0 };
    let tween;
    const play = () => {
      tween && tween.kill();
      state.value = 0;
      tween = gsap.to(state, {
        value: to,
        duration: prefersReducedMotion() ? 0 : 1.6,
        ease: "power2.out",
        onUpdate: () => numberRef.current && (numberRef.current.textContent = Math.round(state.value)),
      });
    };
    const reset = () => {
      tween && tween.kill();
      state.value = 0;
      if (numberRef.current) numberRef.current.textContent = 0;
    };
    const trigger = ScrollTrigger.create({
      trigger: numberRef.current,
      start: "top 90%",
      end: "bottom 5%",
      onEnter: play,
      onEnterBack: play,
      onLeave: reset,
      onLeaveBack: reset,
    });
    return () => {
      trigger.kill();
      tween && tween.kill();
    };
  }, [to]);

  return (
    <div className="text-center">
      <div className="t-stat">
        <span ref={numberRef}>0</span>
        <span className="text-accent">+</span>
      </div>
      <div className="mt-1 text-sm font-semibold text-white/80">{label}</div>
    </div>
  );
}

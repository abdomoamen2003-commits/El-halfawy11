import { useEffect, useRef, useState } from "react";

/**
 * Google Maps embed that is only mounted when it is about to scroll into view,
 * so the (heavy) Maps iframe never competes with the initial page load.
 */
export default function LazyMap({ title, src, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`bg-teal-800 ${className}`}>
      {visible && (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
}

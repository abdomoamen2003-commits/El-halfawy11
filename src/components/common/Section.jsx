const TONES = {
  teal: "bg-teal-600 text-white",
  deep: "bg-teal-900 text-white",
  white: "bg-white text-teal-900",
  tint: "bg-teal-50 text-teal-900",
};

/**
 * Page section.  tone: teal | deep | white | tint     slant: diagonal top edge with orange line
 * Dark tones get the blueprint grid (`bp`), light tones the paper texture (`bp-light`).
 */
export default function Section({ tone = "teal", slant = false, children, className = "", id }) {
  const light = tone === "white" || tone === "tint";
  const dark = tone === "teal" || tone === "deep";
  return (
    <section
      id={id}
      className={`${light ? "on-light bp-light overflow-hidden" : ""} ${TONES[tone]} ${dark ? "bp" : ""} ${slant ? "slant" : ""} px-5 py-24 md:px-10 ${className}`}
    >
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

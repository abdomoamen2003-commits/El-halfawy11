/** Small orange roof-line glyph shown above section titles. */
export default function RoofMark({ center = true }) {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden className={`mb-4 ${center ? "mx-auto" : ""}`}>
      <path d="M2 22 L24 3 L46 22" stroke="#EC9510" strokeWidth="4.5" strokeLinecap="square" />
    </svg>
  );
}

import RoofMark from "./RoofMark";

export default function SectionTitle({ children, sub, light = false, left = false }) {
  return (
    <div className={`mb-14 ${left ? "" : "text-center"}`} data-aos="fade-up">
      <RoofMark center={!left} />
      <h2 className={`t-h2 ${light ? "ink-on-light" : "ink-on-dark"}`}>{children}</h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-lg ${left ? "" : "mx-auto"} ${light ? "text-teal-800/80" : "text-white/85"}`}>{sub}</p>
      )}
    </div>
  );
}

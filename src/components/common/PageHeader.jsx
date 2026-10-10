import Img from "./Img";

/** Banner used at the top of every inner page. `bg` is an image name. */
export default function PageHeader({ title, sub, bg = "hero" }) {
  return (
    <header className="relative overflow-hidden bg-teal-900 px-5 pb-20 pt-40 text-center text-white md:px-10">
      <Img name={bg} alt="" priority sizes="100vw" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/90 to-teal-600/70" />
      <div className="relative mx-auto max-w-4xl">
        <h1 className="ink-on-dark t-h1">{title}</h1>
        {sub && <p className="mt-5 text-xl text-white/85">{sub}</p>}
      </div>
    </header>
  );
}

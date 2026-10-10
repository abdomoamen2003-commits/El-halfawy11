import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Img from "./Img";

/**
 * Client / partner card.
 * Default: white logo on the card; on hover a framed brand-coloured tile is revealed from the centre.
 * (`.mx-clients-page` keeps the coloured tile permanently visible.)
 */
export default function ClientCard({ client, index = 0 }) {
  return (
    <Link
      to={`/projects/${client.project}`}
      className="card group flex flex-col items-center text-center text-white"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="mx-logo">
        <div className="mx-logo-tile" style={{ "--tile": client.tile.bg }} />
        <div className="mx-logo-base">
          <Img
            name={`clients/${client.logo}`}
            alt={client.name}
            sizes="320px"
            className={`${client.h} w-auto max-w-[80%] !w-auto !object-contain !rounded-none`}
          />
        </div>
        <div className="mx-logo-color">
          <Img
            name={`clients/${client.tile.logo}`}
            alt=""
            aria-hidden
            sizes="320px"
            className={`${client.tile.h} w-auto max-w-[70%] !w-auto !object-contain !rounded-none`}
          />
        </div>
      </div>
      <div className="w-full border-t border-white/15 p-5">
        <h3 className="t-h4">{client.name}</h3>
        <p className="mt-1 text-sm font-bold text-accent">{client.role}</p>
        <p className="mt-3 text-sm text-white/80">{client.text}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 group-hover:text-accent">
          View project <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

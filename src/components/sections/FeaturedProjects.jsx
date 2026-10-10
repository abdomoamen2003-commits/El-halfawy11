import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import Img from "../common/Img";
import { projects } from "../../data/projects";
import { prefersReducedMotion } from "../../utils/motion";

/** Auto-advancing featured-project slider (6 s per slide, pauses on hover). */
export default function FeaturedProjects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 6, ease: "none", onComplete: () => setActive((i) => (i + 1) % projects.length) },
    );
    return () => tween.kill();
  }, [active, paused]);

  const project = projects[active];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-[2rem] bg-teal-900 p-4 text-white shadow-2xl md:p-9">
        <div ref={barRef} className="absolute left-0 top-0 h-1 w-full origin-left bg-accent" />
        <div className="grid items-center gap-8 md:grid-cols-2" style={{ animation: "fadeIn .8s ease" }}>
          <Img
            name={project.images[0]}
            alt={project.name}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-72 w-full rounded-2xl object-cover md:h-[26rem]"
          />
          <div>
            <h3 className="t-h2 !text-accent">{project.name}</h3>
            <p className="mt-2 text-lg font-semibold">{project.sub}</p>
            <p className="mt-2 text-white/75">{project.location}</p>
            <p className="mt-5 max-w-md text-white/85">{project.summary}</p>
            <Link to={`/projects/${project.id}`} className="btn-solid mt-8">
              View Details
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3" role="tablist" aria-label="Featured projects">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={p.name}
            onClick={() => setActive(i)}
            className={`relative h-3 rounded-full transition-all duration-500 after:absolute after:-inset-3 after:content-[''] ${
              i === active ? "w-10 bg-accent" : "w-3 bg-teal-800/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

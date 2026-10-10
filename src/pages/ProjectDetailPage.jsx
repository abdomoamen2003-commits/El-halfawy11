import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CircleCheck } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Img from "../components/common/Img";
import { projects } from "../data/projects";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [photo, setPhoto] = useState(0);

  if (!project) return <Navigate to="/projects" />;

  return (
    <>
      <PageHeader title={project.name} bg={project.images[0]} sub={project.sub} />
      <Section slant tone="white">
        <Link to="/projects" className="mb-8 inline-flex items-center gap-2 font-semibold text-teal-600 hover:text-accent">
          <ArrowLeft size={18} />
          All Projects
        </Link>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Img
              key={photo}
              name={project.images[photo]}
              alt={project.name}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-96 w-full rounded-3xl object-cover shadow-xl"
              style={{ animation: "fadeI .5s" }}
            />
            <div className="mt-4 flex gap-3">
              {project.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setPhoto(index)}
                  aria-label={`Photo ${index + 1}`}
                  aria-pressed={index === photo}
                  className={`overflow-hidden rounded-xl border-2 ${index === photo ? "border-accent" : "border-transparent opacity-70"}`}
                >
                  <Img name={image} alt="" sizes="112px" className="h-20 w-28 object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <dl className="grid gap-4 rounded-3xl bg-teal-50 p-7 sm:grid-cols-2">
              {project.client && (
                <div>
                  <dt className="text-sm font-semibold text-teal-600">Client</dt>
                  <dd className="font-bold">{project.client}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-semibold text-teal-600">Location</dt>
                <dd className="font-bold">{project.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-teal-600">Type</dt>
                <dd className="font-bold">{project.type}</dd>
              </div>
              {project.partner && (
                <div>
                  <dt className="text-sm font-semibold text-teal-600">Partner</dt>
                  <dd className="font-bold">{project.partner.replace("Main contractor: ", "")} (main contractor)</dd>
                </div>
              )}
            </dl>
            <h2 className="ink-on-light mt-8 t-h3">Scope of Work</h2>
            <ul className="mt-4 space-y-3">
              {project.scope.map((item) => (
                <li key={item} className="flex gap-3">
                  <CircleCheck className="mt-0.5 shrink-0 text-accent" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

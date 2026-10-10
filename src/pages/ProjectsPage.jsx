import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Img from "../components/common/Img";
import Section from "../components/common/Section";
import PageHeader from "../components/common/PageHeader";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Our Projects"
        bg="soul2"
        sub="Structures, facades and finishes executed for universities, a luxury beach resort and residential compounds."
      />
      <Section slant tone="teal">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="card group text-white"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
            >
              <div className="imgbox">
                <Img name={project.images[0]} alt={project.name} className="h-64" />
              </div>
              <div className="p-5">
                <h3 className="t-h3 text-accent">{project.name}</h3>
                <p className="mt-1 text-sm font-semibold text-white/90">{project.type}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin size={14} />
                  {project.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

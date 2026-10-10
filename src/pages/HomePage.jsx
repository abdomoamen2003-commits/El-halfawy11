import { Link } from "react-router-dom";
import { ArrowRight, Building2, HardHat, House, ClipboardList, Wrench } from "lucide-react";
import Img from "../components/common/Img";
import Section from "../components/common/Section";
import SectionTitle from "../components/common/SectionTitle";
import Counter from "../components/common/Counter";
import Hero from "../components/sections/Hero";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import LocationMap from "../components/sections/LocationMap";
import ClientsSection from "../components/sections/ClientsSection";
import { services, industries, aboutSections } from "../data/content";

const serviceIcons = [HardHat, ClipboardList, Wrench];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section tone="deep" className="!py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <Counter to={5} label="Major projects" />
          <Counter to={4} label="Regions across Egypt" />
          <Counter to={3} label="Core service lines" />
          <Counter to={4} label="Stage work process" />
        </div>
      </Section>
      <Section slant tone="teal">
        <SectionTitle sub="A general contractor providing integrated services across every stage of construction.">
          Our Services
        </SectionTitle>
        <div className="grid gap-7 md:grid-cols-3">
          {services.map((service, index) => {
            const A = serviceIcons[index];
            return (
              <article
                key={service.title}
                className="card"
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                <div className="imgbox">
                  <Img name={service.img} alt={service.title} className="h-56" />
                </div>
                <div className="p-5 text-center">
                  <A className="mx-auto mb-3 text-accent" size={30} />
                  <h3 className="t-h3">{service.title}</h3>
                  <p className="mt-2 text-white/75">{service.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link to="/services" className="btn-outline">
            {"All Services "}
            <ArrowRight size={20} />
          </Link>
        </div>
      </Section>
      <Section slant tone="white">
        <SectionTitle light sub="Quality, safety and innovation shape every build we deliver.">
          About Us
        </SectionTitle>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {aboutSections.map((section, index) => (
            <Link
              key={section.key}
              to="/about"
              className="card group text-white"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="imgbox">
                <Img name={section.img} alt="" className="h-44" />
              </div>
              <div className="flex flex-col items-center gap-3 p-5">
                <h3 className="t-h4">{section.key}</h3>
                <span className="rounded-lg border-2 border-accent p-1.5 text-accent transition-colors group-hover:bg-accent group-hover:text-teal-900">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section slant tone="teal">
        <SectionTitle>Industry Expertise</SectionTitle>
        <div className="grid gap-7 md:grid-cols-2">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              className="overflow-hidden rounded-3xl bg-white text-teal-900"
              data-aos={index ? "fade-left" : "fade-right"}
            >
              <div className="imgbox !rounded-none">
                <Img
                  name={industry.img}
                  alt={industry.title}
                  className="h-64 w-full object-cover"
                />
              </div>
              <div className="flex gap-5 p-8">
                {index ? (
                  <House className="shrink-0 text-accent" size={36} />
                ) : (
                  <Building2 className="shrink-0 text-accent" size={36} />
                )}
                <div>
                  <h3 className="t-h3 text-teal-600">{industry.title}</h3>
                  <p className="mt-2">{industry.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section slant tone="white">
        <SectionTitle light>Our Featured Projects</SectionTitle>
        <FeaturedProjects />
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="btn-outline !text-teal-600 !border-accent hover:!text-teal-900"
          >
            {"All Projects "}
            <ArrowRight size={20} />
          </Link>
        </div>
      </Section>
      <ClientsSection />
      <Section slant tone="deep" className="text-center">
        <SectionTitle sub="Whether you have a question, a business inquiry, or a project to discuss, we're here to listen.">
          Get in Touch
        </SectionTitle>
        <Link to="/contact" className="btn-outline">
          {"Contact Us "}
          <ArrowRight size={20} />
        </Link>
      </Section>
      <LocationMap />
    </>
  );
}

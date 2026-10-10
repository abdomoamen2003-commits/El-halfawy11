import { Leaf, ShieldCheck } from "lucide-react";
import Img from "../components/common/Img";
import Section from "../components/common/Section";
import SectionTitle from "../components/common/SectionTitle";
import PageHeader from "../components/common/PageHeader";
import { services, industries, workProcess } from "../data/content";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        bg="survey"
        sub="What we do best, delivered through a disciplined four-stage process."
      />
      <Section slant tone="white">
        <div className="grid gap-7 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="card text-white"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="imgbox">
                <Img name={service.img} alt={service.title} className="h-60" />
              </div>
              <div className="p-5 text-center">
                <h3 className="t-h3">{service.title}</h3>
                <p className="mt-2 text-white/75">{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section slant tone="teal">
        <SectionTitle sub="From first study to final handover.">Our Work Process</SectionTitle>
        <ol className="grid gap-6 md:grid-cols-4">
          {workProcess.map((step, index) => (
            <li
              key={step.title}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className="overflow-hidden rounded-3xl bg-white text-teal-900"
            >
              <div className="imgbox !rounded-none">
                <Img name={step.img} alt={step.title} className="h-44 w-full object-cover" />
              </div>
              <div className="p-6">
                <span className="t-num text-accent/90">{index + 1}</span>
                <h3 className="t-h4 text-teal-600">{step.title}</h3>
                <p className="mt-2 text-sm">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section slant tone="white">
        <div className="grid gap-7 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-teal-50" data-aos="fade-right">
            <div className="imgbox !rounded-none">
              <Img name="hats.jpg" alt="Safety helmets" className="h-56 w-full object-cover" />
            </div>
            <div className="p-9">
              <ShieldCheck className="text-accent" size={38} />
              <h3 className="ink-on-light mt-3 t-h3">Commitment to Safety</h3>
              <p className="mt-3">
                Strict safety protocols, continuous training and on-site supervision protect
                workers, partners and project stakeholders while minimizing operational risk.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl bg-teal-50" data-aos="fade-left">
            <div className="grid grid-cols-3 gap-1">
              {["sus1", "sus2", "plan"].map((item) => (
                <div key={item} className="imgbox !rounded-none">
                  <Img
                    name={item + ".jpg"}
                    alt="Sustainable site practice"
                    className="h-56 w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="p-9">
              <Leaf className="text-accent" size={38} />
              <h3 className="ink-on-light mt-3 t-h3">Sustainability Approach</h3>
              <p className="mt-3">
                Sustainable, durable materials that reduce environmental impact without compromising
                performance, plus efficient practices that cut waste and energy use.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7 grid gap-7 md:grid-cols-2">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="rounded-3xl border-2 border-accent p-8"
              data-aos="fade-up"
            >
              <h3 className="t-h3 text-teal-600">{industry.title}</h3>
              <p className="mt-2">{industry.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

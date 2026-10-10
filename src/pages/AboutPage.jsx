import { CircleCheck } from "lucide-react";
import Img from "../components/common/Img";
import Section from "../components/common/Section";
import SectionTitle from "../components/common/SectionTitle";
import PageHeader from "../components/common/PageHeader";
import AboutRows from "../components/sections/AboutRows";
import { whyChoose } from "../data/content";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        bg="team"
        sub="El Halfawy is a forward-thinking construction company specializing in commercial, residential and infrastructure projects."
      />
      <AboutRows />
      <Section slant tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <SectionTitle light left>
              Who We Are
            </SectionTitle>
            <p className="text-lg">
              El Halfawy is a forward-thinking construction company specializing in commercial,
              residential and infrastructure projects.
            </p>
            <p className="mt-4 text-lg">
              With a strong commitment to quality, safety and innovation, the company delivers
              reliable construction solutions that transform concepts into durable, functional and
              sustainable built environments.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
            <div className="imgbox">
              <Img
                name="overview1.jpg"
                alt="Rebar fixing on site"
                className="h-80 w-full object-cover"
              />
            </div>
            <div className="imgbox mt-10">
              <Img
                name="overview2.jpg"
                alt="Cladding stone delivery"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>
      <Section slant tone="teal">
        <SectionTitle sub="Our competitive strengths">Why Choose El Halfawy</SectionTitle>
        <div className="grid gap-7 md:grid-cols-3">
          {whyChoose.map((reason, index) => (
            <div
              key={reason.title}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className="rounded-3xl border-2 border-accent glass p-5"
            >
              <div className="imgbox mb-5">
                <Img name={reason.img} alt={reason.title} className="h-56 w-full object-cover" />
              </div>
              <div className="px-3 pb-3">
                <CircleCheck className="text-accent" size={30} />
                <h3 className="t-h3 mt-3">{reason.title}</h3>
                <p className="mt-2 text-white/80">{reason.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section slant tone="white">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div data-aos="fade-right">
            <SectionTitle light left>
              Future Growth
            </SectionTitle>
            <p className="text-lg">
              We continue to expand our capabilities through technology adoption, workforce
              development and strategic partnerships, planning larger and more complex projects
              while holding onto our core values: quality, safety and environmental sustainability.
            </p>
          </div>
          <Img
            data-aos="fade-left"
            name="team2"
            alt="El Halfawy site team"
            className="rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </Section>
    </>
  );
}

import { ArrowRight } from "lucide-react";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import LazyMap from "../common/LazyMap";
import { siteConfig } from "../../data/site";

export default function LocationMap() {
  return (
    <Section slant tone="white">
      <SectionTitle light sub="Visit our office or get directions in one tap.">
        Our Location
      </SectionTitle>
      <div className="overflow-hidden rounded-3xl border-2 border-accent shadow-2xl" data-aos="fade-up">
        <LazyMap
          title="El Halfawy office location"
          src={`https://www.google.com/maps?q=${siteConfig.mapQuery}&t=k&z=17&output=embed`}
          className="h-96 w-full md:h-[26rem]"
        />
      </div>
      <div className="mt-10 text-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline !text-teal-600 !border-accent hover:!text-teal-900"
        >
          Open in Google Maps <ArrowRight size={20} />
        </a>
      </div>
    </Section>
  );
}

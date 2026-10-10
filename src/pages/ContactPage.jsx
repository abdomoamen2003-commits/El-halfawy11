import { Mail, Phone } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import ContactForm from "../components/sections/ContactForm";
import LazyMap from "../components/common/LazyMap";
import { siteConfig } from "../data/site";

const CHANNELS = [
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        bg="survey"
        sub="Whether you have a question, a business inquiry, or just want to say hello, we're here to listen."
      />
      <Section slant tone="teal">
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-5" data-aos="fade-left">
            {CHANNELS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 text-teal-900 transition-transform hover:-translate-y-1"
              >
                <Icon className="text-accent" size={28} />
                <span>
                  <span className="block text-sm font-semibold text-teal-600">{label}</span>
                  <span className="font-bold">{value}</span>
                </span>
              </a>
            ))}
            <LazyMap
              title="El Halfawy location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&t=k&z=17&output=embed`}
              className="h-72 w-full overflow-hidden rounded-2xl"
            />
          </div>
        </div>
      </Section>
    </>
  );
}

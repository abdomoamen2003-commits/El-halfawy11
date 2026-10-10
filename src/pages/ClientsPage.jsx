import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import SectionTitle from "../components/common/SectionTitle";
import ClientCard from "../components/common/ClientCard";
import { clients } from "../data/clients";

/** Dedicated "Clients & Partners" page: brand-coloured logo on top, the client's story directly beneath it. */
export default function ClientsPage() {
  return (
    <>
      <PageHeader title="Clients & Partners" bg="hero" sub="The owners, developers and contractors we build with." />
      <Section slant tone="teal" className="mx-clients-page">
        <div className="grid gap-8 sm:grid-cols-2">
          {clients.map((client, index) => (
            <ClientCard key={client.name} client={client} index={index} />
          ))}
        </div>
      </Section>
      <Section slant tone="deep" className="text-center">
        <SectionTitle sub="Whether you have a question, a business inquiry, or a project to discuss, we're here to listen.">
          Get in Touch
        </SectionTitle>
        <Link to="/contact" className="btn-outline">
          Contact Us <ArrowRight size={20} />
        </Link>
      </Section>
    </>
  );
}

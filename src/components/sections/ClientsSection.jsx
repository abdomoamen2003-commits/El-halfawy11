import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import ClientCard from "../common/ClientCard";
import { clients } from "../../data/clients";

/** "Clients & Partners" block of the home page (4 cards in a row on desktop). */
export default function ClientsSection() {
  return (
    <Section slant tone="teal">
      <SectionTitle>Clients & Partners</SectionTitle>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((client, index) => (
          <ClientCard key={client.name} client={client} index={index} />
        ))}
      </div>
    </Section>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";

export default function NotFoundPage() {
  return (
    <>
      <PageHeader title="Page Not Found" sub="The page you are looking for does not exist or has been moved." />
      <Section slant tone="teal" className="text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-outline">
            Back to Home <ArrowRight size={20} />
          </Link>
          <Link to="/contact" className="btn-ghost">
            Contact Us
          </Link>
        </div>
      </Section>
    </>
  );
}

import { Link } from "react-router-dom";
import { Globe, Mail, Phone } from "lucide-react";
import Img from "../common/Img";
import { navLinks, siteConfig } from "../../data/site";

export default function Footer() {
  return (
    <footer className="bg-teal-900 px-5 pb-8 pt-16 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <Img
            name="logo-white.png"
            alt="El Halfawy — Architecture & General Contracting"
            className="h-20 w-auto"
          />
          <p className="mt-5 max-w-xs text-white/75">
            Building trust, building the future. Reliable construction solutions that transform
            concepts into durable, functional and sustainable built environments.
          </p>
        </div>
        <div>
          <h3 className="t-h4">Explore</h3>
          <ul className="mt-4 space-y-2 text-white/80">
            {navLinks.map(([to, label]) => (
              <li key={to}>
                <Link className="hover:text-accent" to={to}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="t-h4">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-white/80">
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent" />
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-accent" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={18} className="text-accent" />
              <span>{siteConfig.site}</span>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-7xl border-t border-white/15 pt-6 text-sm text-white/55">
        {"© "}
        {new Date().getFullYear()}
        {" El Halfawy — Architecture & General Contracting. All rights reserved."}
      </p>
    </footer>
  );
}

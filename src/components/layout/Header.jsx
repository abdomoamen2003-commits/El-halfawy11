import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Img from "../common/Img";
import { navLinks } from "../../data/site";

const BRAND = "El Halfawy — Architecture & General Contracting";

/** Fixed navigation bar. Transparent over the hero, solid white once the page is scrolled. */
export default function Header({ scrolled }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "mx-nav-solid" : "mx-nav-top"}`}>
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-10 ${
          scrolled ? "h-[60px] md:h-[68px]" : "h-[68px] md:h-[84px]"
        }`}
      >
        <Link to="/" aria-label={BRAND} className="flex items-center">
          <Img
            name="logo-mark.png"
            alt="El Halfawy"
            priority
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10 md:h-11" : "h-11 md:h-14"}`}
          />
          <span className={`mx-brand ${scrolled ? "is-on" : ""}`} aria-hidden>
            <span className="mx-brand-name">El Halfawy</span>
            <span className="mx-brand-sub">Architecture & General Contracting</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Main">
          {navLinks.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `group relative whitespace-nowrap py-2 text-[14px] font-semibold transition-colors lg:text-[15px] ${
                  isActive ? "text-accent" : "text-teal-900 hover:text-teal-600"
                }`
              }
            >
              {label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        {...(open ? {} : { inert: "" })}
        className={`overflow-hidden bg-white transition-[max-height] duration-500 md:hidden ${open ? "max-h-96" : "max-h-0"}`}
      >
        {navLinks.map(([to, label]) => (
          <NavLink key={to} to={to} end className="block border-t border-teal-50 px-6 py-4 font-semibold">
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

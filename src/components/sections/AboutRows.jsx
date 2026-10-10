import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Section from "../common/Section";
import Img from "../common/Img";
import { aboutSections } from "../../data/content";

export default function AboutRows() {
  const [o, setO] = useState(null);
  const cut = (x) => {
    if (x.length <= 96) return x;
    let c = x.slice(0, 96);
    return c.slice(0, c.lastIndexOf(" ")) + "\u2026";
  };
  return (
    <Section slant tone="deep">
      <div className="mx-about">
        {aboutSections.map((section, index) => {
          const a = o === index;
          return (
            <article key={section.key} className={"mx-about-row" + (index % 2 ? " is-rev" : "")}>
              <div className="mx-about-img" data-aos={index % 2 ? "fade-left" : "fade-right"}>
                <div className="imgbox">
                  <Img name={section.img} alt={section.key} />
                </div>
              </div>
              <div className="mx-about-txt" data-aos={index % 2 ? "fade-right" : "fade-left"}>
                <h2 className="t-h2 mx-about-h">{section.key}</h2>
                <p className="mx-about-p">{a ? section.text : cut(section.text)}</p>
                <button
                  type="button"
                  aria-expanded={a}
                  onClick={() => setO(a ? null : index)}
                  className="btn-outline"
                >
                  {a ? "View Less" : "View More"} <ArrowRight size={20} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

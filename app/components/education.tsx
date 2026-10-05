"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { catHints, education } from "../data";
import { HiddenCat } from "./cats";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Education() {
  return (
    <section className="section education-section" id="education" aria-labelledby="education-head">
      <SectionHead
        id="education-head"
        num="03"
        kicker="education"
        title="Education"
        accent={["Education"]}
        sub="Flip a card for the footnotes."
      />
      <div className="education-grid">
        {education.map((card, index) => (
          <EduCard key={card.id} card={card} index={index} />
        ))}
      </div>
      <HiddenCat id="education" hint={catHints[5].hint} className="education-cat" />
    </section>
  );
}

function EduCard({ card, index }: { card: (typeof education)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();
  const btnId = `edu-${card.id}-btn`;

  const flip = () => setFlipped((f) => !f);

  return (
    <Reveal className="edu-wrap" delay={index * 0.1} y={24}>
      <div
        className={`edu-card ${flipped ? "is-flipped" : ""}`}
        data-cursor="flip"
        onClick={flip}
      >
        <motion.div
          className="edu-inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="edu-face edu-front">
            <p className="eyebrow">{card.period}</p>
            <h3 className="edu-school">{card.school}</h3>
            <p className="edu-headline">{card.headline}</p>
          </div>
          <div className="edu-face edu-back">
            <p className="eyebrow">{card.school}</p>
            <ul className="edu-details">
              {card.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      <button type="button" className="edu-flip-btn" id={btnId} aria-pressed={flipped} onClick={flip}>
        {flipped ? "flip back ↺" : "flip for details ↻"}
      </button>
    </Reveal>
  );
}

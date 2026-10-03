"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { faqs } from "../data";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-head">
      <SectionHead
        id="faq-head"
        num="07"
        kicker="faq"
        title="Quick answers, no wait."
        accent={["answers,"]}
        sub="The questions people actually ask."
      />
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <Reveal key={faq.question} className="faq-item" delay={index * 0.05} y={16}>
              <h3 className="faq-question-wrap">
                <button
                  type="button"
                  className={`faq-toggle ${open ? "is-open" : ""}`}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {faq.question}
                  <span className="faq-icon" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    id={panelId}
                    className="faq-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="faq-answer">
                      {faq.answer}
                      {faq.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

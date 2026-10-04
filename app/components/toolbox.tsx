"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { lookUpSkill, toolbox, catHints } from "../data";
import { HiddenCat } from "./cats";
import { SectionHead } from "./section-head";

export function Toolbox() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const refs = selected ? lookUpSkill(selected) : [];

  const toggle = (skill: string) => {
    setSelected((prev) => (prev === skill ? null : skill));
  };

  const openCase = (slug?: string) => {
    if (slug) window.dispatchEvent(new CustomEvent("open-case", { detail: slug }));
  };

  return (
    <section className="section toolbox-section" id="toolbox" aria-labelledby="toolbox-head">
      <SectionHead
        id="toolbox-head"
        num="04"
        kicker="skills"
        title="Skills and tools"
        accent={["tools"]}
        sub="Pick a skill to see where I've used it."
      />
      <div className="toolbox-groups">
        {toolbox.map((group) => (
          <div className="tool-group" key={group.group}>
            <p className="tool-group-label">{group.group}</p>
            <div className="tool-chips" role="group" aria-label={group.group}>
              {group.skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className={`tool-chip ${selected === skill ? "is-on" : ""}`}
                  aria-pressed={selected === skill}
                  onClick={() => toggle(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="skill-refs-zone" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {selected ? (
            <motion.div
              key={selected}
              className="skill-refs"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="skill-refs-title">
                where <span className="display-em">{selected}</span> shows up
              </p>
              {refs.length > 0 ? (
                <ul className="skill-ref-list">
                  {refs.map((ref, i) => (
                    <motion.li
                      key={`${ref.kind}-${ref.title}`}
                      className={`skill-ref ${ref.kind === "project" ? "is-project" : "is-role"}`}
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduced ? 0 : 0.06 + i * 0.05, duration: 0.32 }}
                    >
                      {ref.kind === "project" && ref.slug ? (
                        <button type="button" onClick={() => openCase(ref.slug)}>
                          <span className="skill-ref-kind">project</span>
                          <span className="skill-ref-title-text">{ref.title}</span>
                          <span className="skill-ref-context">{ref.context}</span>
                          <span className="skill-ref-open" aria-hidden="true">
                            open ↗
                          </span>
                        </button>
                      ) : (
                        <a href={ref.href ?? "#experience"} target={ref.href ? "_blank" : undefined} rel={ref.href ? "noreferrer" : undefined}>
                          <span className="skill-ref-kind">role</span>
                          <span className="skill-ref-title-text">{ref.title}</span>
                          <span className="skill-ref-context">{ref.context}</span>
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="skill-refs-empty">
                  Nothing shipped with this yet. It comes up in coursework and side projects. Ask me about it.
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              className="skill-refs-idle"
              initial={false}
              exit={{ opacity: 0 }}
            >
              Pick a skill above to see the projects and roles where I&apos;ve used it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <HiddenCat id="toolbox" hint={catHints[6].hint} className="toolbox-cat" />
    </section>
  );
}

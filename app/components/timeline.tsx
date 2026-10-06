"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { asset, catHints, experience } from "../data";
import { HiddenCat } from "./cats";
import { useAnimationsEnabled } from "./lib";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Timeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const animate = useAnimationsEnabled();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.72", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <section className="section timeline-section" id="experience" aria-labelledby="experience-head">
      <SectionHead
        id="experience-head"
        num="02"
        kicker="experience"
        title="Experience"
        accent={["Experience"]}
        sub="Click an entry to unfold the details."
      />
      <div className="timeline" ref={wrapRef}>
        <div className="timeline-rail" aria-hidden="true">
          {animate ? <motion.div className="timeline-fill" style={{ scaleY }} /> : <div className="timeline-fill" />}
        </div>
        <ol className="timeline-list">
          {experience.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </ol>
      </div>
      <HiddenCat id="experience" hint={catHints[4].hint} className="timeline-cat" />
    </section>
  );
}

function TimelineItem({ entry, index }: { entry: (typeof experience)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { margin: "0px 0px -45% 0px" });
  const animate = useAnimationsEnabled();
  const panelId = `exp-${entry.id}-panel`;
  const initial = entry.company
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z0-9]/g, "")[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const copy = (
    <>
      <p className="timeline-summary">{entry.summary}</p>
      <ul className="timeline-bullets">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <ul className="tag-chips" aria-label="Tags">
        {entry.tags.map((tag) => (
          <li className="chip" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <li className={`timeline-item ${inView ? "is-lit" : ""}`}>
      <span className="timeline-node" ref={nodeRef} aria-hidden="true" />
      <Reveal className="timeline-card" delay={0.05} y={20}>
        <button
          type="button"
          className="timeline-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="timeline-period">{entry.period}</span>
          {entry.image ? (
            <Image
              className="timeline-thumb"
              src={asset(entry.image.src)}
              alt=""
              aria-hidden="true"
              width={52}
              height={52}
            />
          ) : (
            <span className="timeline-thumb timeline-thumb-text" aria-hidden="true">
              {initial}
            </span>
          )}
          <span className="timeline-role">
            <strong>{entry.role}</strong>
            <span className="timeline-company">{entry.company}</span>
          </span>
          <span className="timeline-chevron" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              className="timeline-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: animate ? 0.36 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              {entry.image ? (
                <div className="timeline-panel-inner has-photo">
                  <Image
                    className="timeline-photo"
                    src={asset(entry.image.src)}
                    alt={entry.image.alt}
                    width={320}
                    height={240}
                    sizes="(max-width: 720px) 88vw, 320px"
                    loading="lazy"
                  />
                  <div className="timeline-panel-copy">{copy}</div>
                </div>
              ) : (
                copy
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Reveal>
    </li>
  );
}

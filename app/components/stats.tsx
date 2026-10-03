"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { catHints, stats } from "../data";
import { HiddenCat } from "./cats";
import { Reveal } from "./reveal";

export function Stats() {
  return (
    <section className="stats-section section" aria-label="By the numbers">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatBlock key={stat.label} stat={stat} index={index} />
        ))}
      </div>
      <HiddenCat id="stats" hint={catHints[2].hint} className="stats-cat" />
    </section>
  );
}

function StatBlock({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });
  const reduced = useReducedMotion();
  const count = useMotionValue(stat.value);
  const text = useTransform(count, (v) => `${Math.round(v)}`);

  useEffect(() => {
    if (!inView || reduced) return;
    count.set(0);
    const controls = animate(count, stat.value, {
      duration: 1.5,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, count, stat.value, index]);

  return (
    <Reveal className="stat-block" delay={index * 0.08} y={22}>
      <div className="stat-number" ref={ref}>
        <motion.span className="stat-value">{text}</motion.span>
        {stat.suffix ? <span className="stat-suffix">{stat.suffix}</span> : null}
      </div>
      <p className="stat-label">{stat.label}</p>
      <p className="stat-footnote">
        {stat.footnote}
        {stat.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
      </p>
    </Reveal>
  );
}

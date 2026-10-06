"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useVelocity } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { marquee, catHints } from "../data";
import { HiddenCat } from "./cats";
import { useAnimationsEnabled } from "./lib";

export function Marquee() {
  const animate = useAnimationsEnabled();
  const allTech = marquee.rows.flat();

  return (
    <section className="marquee-section" aria-label="Technology stack">
      <HiddenCat id="marquee" hint={catHints[1].hint} className="marquee-cat" />
      <ul className="sr-only">
        {allTech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {animate ? (
        <div aria-hidden="true">
          <MarqueeRow items={marquee.rows[0]} direction={1} baseSpeed={62} />
          <MarqueeRow items={marquee.rows[1]} direction={-1} baseSpeed={54} />
        </div>
      ) : (
        <div className="marquee-static" aria-hidden="true">
          {marquee.rows.map((row, i) => (
            <div className="marquee-static-row" key={i}>
              {row.map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** One infinitely scrolling row; speed reacts to scroll velocity, pauses on hover. */
function MarqueeRow({ items, direction, baseSpeed }: { items: readonly string[]; direction: 1 | -1; baseSpeed: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [half, setHalf] = useState(1);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setHalf(Math.max(1, track.scrollWidth / 2));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const v = smoothVelocity.get();
    const boost = Math.min(Math.abs(v) / 900, 2.2);
    let move = direction * baseSpeed * (1 + boost);
    if (Math.abs(v) > 2600) move -= (v / 2600) * baseSpeed * direction;
    let next = x.get() - (move * delta) / 1000;
    if (half > 1) {
      if (next <= -half) next += half;
      if (next > 0) next -= half;
    }
    x.set(next);
  });

  return (
    <div
      className={`marquee-row ${direction === 1 ? "runs-left" : "runs-right"}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.div className="marquee-track" ref={trackRef} style={{ x }}>
        <MarqueeItems items={items} />
        <MarqueeItems items={items} hidden />
      </motion.div>
    </div>
  );
}

function MarqueeItems({ items, hidden = false }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <span className="marquee-chunk" aria-hidden={hidden || undefined}>
      {items.map((tech) => (
        <span className="chip marquee-chip" key={tech}>
          {tech}
        </span>
      ))}
    </span>
  );
}

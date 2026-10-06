"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useAnimationsEnabled } from "./lib";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "p" | "span";
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade/slide-in on first view. Respects reduced motion (renders final state). */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const animate = useAnimationsEnabled();

  if (!animate) {
    const Plain = as;
    return (
      <Plain className={className} data-reveal>
        {children}
      </Plain>
    );
  }

  const Tag =
    as === "section"
      ? motion.section
      : as === "article"
        ? motion.article
        : as === "li"
          ? motion.li
          : as === "p"
            ? motion.p
            : as === "span"
              ? motion.span
              : motion.div;
  return (
    <Tag
      className={className}
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

type SplitWordsProps = {
  text: string;
  className?: string;
  /** Words to render in italic display accent. */
  accent?: string[];
  delay?: number;
};

/** Heading whose words rise in, staggered. */
export function SplitWords({ text, className, accent = [], delay = 0 }: SplitWordsProps) {
  const animate = useAnimationsEnabled();
  // Observe the heading once: per-word observers never fire because each word starts clipped by its mask.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const lines = text.split("\n");
  const accentSet = new Set(accent.map((word) => word.toLowerCase()));
  let wordIndex = 0;

  const words = lines.map((line, lineIdx) => (
    <span key={lineIdx} style={{ display: "block" }}>
      {line.split(" ").map((rawWord) => {
        const word = rawWord.replace(/\*/g, "");
        const isAccent = accentSet.has(word.toLowerCase());
        const i = wordIndex++;
        return (
          <span key={`${word}-${i}`} className="word-mask" data-reveal>
            {animate ? (
              <motion.span
                className={`word ${isAccent ? "display-em" : ""}`}
                style={{ display: "inline-block", willChange: "transform" }}
                initial={{ y: "115%", rotate: 4 }}
                animate={inView ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 4 }}
                transition={{ duration: 0.72, delay: delay + i * 0.05, ease: EASE }}
              >
                {word}
                {"\u00A0"}
              </motion.span>
            ) : (
              <span className={`word ${isAccent ? "display-em" : ""}`} style={{ display: "inline-block" }}>
                {word}
                {"\u00A0"}
              </span>
            )}
          </span>
        );
      })}
    </span>
  ));

  return (
    <h2 ref={ref} className={className}>
      {words}
    </h2>
  );
}

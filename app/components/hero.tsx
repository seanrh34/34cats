"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { asset, catHints, hero, site, status } from "../data";
import { Clock } from "./clock";
import { HiddenCat } from "./cats";
import { useAnimationsEnabled } from "./lib";
import { socialIcon } from "./icons";

export function Hero() {
  const animate = useAnimationsEnabled();

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <DotGrid />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="status-chip">
            <span className="status-pulse" aria-hidden="true" />
            {status.text}
            {status.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
          </p>
          <h1 className="hero-name" aria-label={hero.name}>
            {hero.name.split("").map((char, i) =>
              char === " " ? (
                <span key={i} className="hero-letter hero-space">
                  {"\u00A0"}
                </span>
              ) : animate ? (
                <motion.span
                  key={i}
                  className="hero-letter"
                  data-reveal
                  initial={{ y: "70%", opacity: 0, rotate: 6 }}
                  animate={{ y: "0%", opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.12 + i * 0.045, type: "spring", stiffness: 260, damping: 22 }}
                  whileHover={{ y: -12, rotate: -5, color: "var(--accent-text)" }}
                >
                  {char}
                </motion.span>
              ) : (
                <span key={i} className="hero-letter">
                  {char}
                </span>
              ),
            )}
          </h1>
          <p className="hero-line">
            <span aria-hidden="true">
              I build <Typewriter />
            </span>
            <span className="sr-only">I build {hero.phrases.join(". I build ")}.</span>
          </p>
          <p className="hero-intro">{hero.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <Link className="btn btn-ghost" href="/resume">
              Résumé <span aria-hidden="true">↗</span>
            </Link>
            <div className="hero-socials">
              {site.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    className="hero-social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} (opens in new tab)`}
                  >
                    <Icon width={17} height={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <TiltPortrait />
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-label">scroll</span>
        <motion.span
          className="hero-scroll-arrow"
          animate={animate ? { y: [0, 7, 0] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </div>
      <HiddenCat id="hero" hint={catHints[0].hint} className="hero-cat" />
    </section>
  );
}

/** Types/morphs the cycling phrase. Reduced motion: static first phrase. */
function Typewriter() {
  const phrases = hero.phrases;
  const reduced = useReducedMotion();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState<string>(phrases[0]);
  const [mode, setMode] = useState<"idle" | "deleting" | "typing">("idle");

  useEffect(() => {
    if (reduced) return;
    const current = phrases[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (mode === "idle") {
      timer = setTimeout(() => setMode("deleting"), 2100);
    } else if (mode === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 24);
      } else {
        timer = setTimeout(() => {
          setPhraseIdx((i) => (i + 1) % phrases.length);
          setMode("typing");
        }, 260);
      }
    } else {
      const nextPhrase = phrases[phraseIdx];
      if (text.length < nextPhrase.length) {
        timer = setTimeout(() => setText(nextPhrase.slice(0, text.length + 1)), 46);
      } else {
        timer = setTimeout(() => setMode("idle"), 1400);
      }
    }
    return () => clearTimeout(timer);
  }, [mode, text, phraseIdx, phrases, reduced]);

  return (
    <span className="hero-type">
      {reduced ? phrases[0] : text}
      <span className="hero-caret" aria-hidden="true" />
    </span>
  );
}

/** Portrait card with 3D tilt + glare. Reduced motion: static. */
function TiltPortrait() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const springConfig = { stiffness: 160, damping: 20, mass: 0.5 };
  const sRotateX = useSpring(rotateX, springConfig);
  const sRotateY = useSpring(rotateY, springConfig);
  const transform = useMotionTemplate`perspective(900px) rotateX(${sRotateX}deg) rotateY(${sRotateY}deg)`;
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22), transparent 55%)`;

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set(-(py - 0.5) * 12);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div className="hero-portrait-wrap">
      <div
        className="hero-portrait"
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        data-cursor="hi"
      >
        <motion.div className="hero-portrait-card" style={{ transform }}>
          <Image
            src={asset("/images/sean_photo_resized.jpg")}
            alt="Sean Richardson Hardjanto"
            width={720}
            height={900}
            priority
            sizes="(max-width: 860px) 72vw, 360px"
          />
          <motion.span className="hero-portrait-glare" style={{ background: glare }} aria-hidden="true" />
          <span className="hero-portrait-sticker">NUS CS · Y3</span>
        </motion.div>
      </div>
      <p className="hero-portrait-caption">
        Currently: Guidesify · Singapore (SGT <Clock className="mono-time" />)
      </p>
    </div>
  );
}

/** Dot-grid canvas: dots near the cursor brighten and get pushed away. */
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    const passive = reduced || coarse;

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number }[] = [];
    let raf = 0;
    let running = false;
    let onScreen = true;
    let docVisible = !document.hidden;
    const pointer = { x: -9999, y: -9999 };

    const spacing = 30;
    const radius = 150;

    const themeColors = () => {
      const light = document.documentElement.dataset.theme === "light";
      return light
        ? { base: "34, 29, 21", accent: "194, 92, 16", baseAlpha: 0.16 }
        : { base: "243, 239, 232", accent: "255, 138, 61", baseAlpha: 0.16 };
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y });
        }
      }
      if (passive) drawStatic();
    };

    const drawStatic = () => {
      const colors = themeColors();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(${colors.base}, ${colors.baseAlpha})`;
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = () => {
      if (!running) return;
      const colors = themeColors();
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) {
          ctx.fillStyle = `rgba(${colors.base}, ${colors.baseAlpha})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        const influence = 1 - dist / radius;
        const ease = influence * influence;
        const push = 12 * ease;
        const angle = dist === 0 ? 0 : Math.atan2(dy, dx);
        const px = dot.x + Math.cos(angle) * push;
        const py = dot.y + Math.sin(angle) * push;
        const size = 1.4 + 2.2 * ease;
        ctx.fillStyle = `rgba(${colors.accent}, ${0.25 + 0.65 * ease})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const shouldRun = !passive && onScreen && docVisible;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    layout();

    // redraw the static grid when the theme flips (no rAF loop in passive mode)
    const themeObserver = new MutationObserver(() => {
      if (passive) drawStatic();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);
    const onVisibility = () => {
      docVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", layout);
    if (!passive) window.addEventListener("pointermove", onPointerMove, { passive: true });
    sync();

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
      running = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

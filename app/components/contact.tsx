"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { asset, catHints, site } from "../data";
import { HiddenCat } from "./cats";
import { socialIcon } from "./icons";
import { useToast } from "./toast";
import { Reveal } from "./reveal";
import { SplitWords } from "./reveal";

export function Contact() {
  const reduced = useReducedMotion();
  const toast = useToast();
  const btnRef = useRef<HTMLAnchorElement>(null);
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const spring = { stiffness: 180, damping: 16, mass: 0.4 };
  const sx = useSpring(magnetX, spring);
  const sy = useSpring(magnetY, spring);

  const onMagnetMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    magnetX.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    magnetY.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  };
  const onMagnetLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast({ title: "email copied", detail: site.email });
    } catch {
      toast({ title: "couldn't copy", detail: site.email });
    }
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-head">
      <p className="eyebrow">
        <span className="num">[08]</span>contact
      </p>
      <SplitWords
        text={"Get in\ntouch."}
        className="contact-title"
        accent={["touch."]}
      />
      <span id="contact-head" className="sr-only">
        Contact
      </span>
      <Reveal className="contact-body" y={24}>
        <p className="contact-sub">
          Internships, freelance builds, hackathon teams, or a good excuse to draw more cats.
          My inbox is open.
        </p>
        <div className="contact-actions">
          <div className="magnet-zone" onPointerMove={onMagnetMove} onPointerLeave={onMagnetLeave}>
            <motion.a
              ref={btnRef}
              className="btn btn-primary contact-magnet"
              href={`mailto:${site.email}`}
              style={{ x: sx, y: sy }}
              whileHover={reduced ? undefined : { scale: 1.03 }}
            >
              Say hello <span aria-hidden="true">→</span>
            </motion.a>
          </div>
          <button type="button" className="contact-email-chip" onClick={copyEmail} data-cursor="copy">
            <span className="contact-email-text">{site.email}</span>
            <span className="contact-email-hint">click to copy</span>
          </button>
          <a className="btn btn-ghost" href={asset(site.resumePath)} download>
            Download résumé <span aria-hidden="true">↓</span>
          </a>
        </div>
        <ul className="contact-socials" aria-label="Find me online">
          {site.socials.map((social) => {
            const Icon = socialIcon(social.label);
            return (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  <Icon width={16} height={16} />
                  <span>{social.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
      <HiddenCat id="contact" hint={catHints[8].hint} className="contact-cat" />
    </section>
  );
}

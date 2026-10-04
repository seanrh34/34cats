"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "../data";
import { asset, catHints, projects, site } from "../data";
import { HiddenCat } from "./cats";
import { CloseIcon } from "./icons";
import { useDialogBehavior, useMediaQuery } from "./lib";
import { SectionHead } from "./section-head";

export function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 900px)");
  const horizontal = wide && !reduced;
  const openProject = openSlug ? projects.find((p) => p.slug === openSlug) ?? null : null;
  const pushedRef = useRef(false);

  const openCase = useCallback((slug: string) => {
    setOpenSlug(slug);
    try {
      window.history.pushState({ case: slug }, "", `#case-${slug}`);
      pushedRef.current = true;
    } catch {
      /* ignore */
    }
  }, []);

  const closeCase = useCallback(() => {
    setOpenSlug(null);
    if (!window.location.hash.startsWith("#case-")) return;
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch {
        /* ignore */
      }
    }
  }, []);

  // back button / popstate closes the drawer
  useEffect(() => {
    const onPop = () => {
      pushedRef.current = false;
      setOpenSlug(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // deep link: open a case study from the URL hash (e.g. /#case-dozebuster)
  useEffect(() => {
    const slug = window.location.hash.replace(/^#case-/, "");
    if (slug && projects.some((p) => p.slug === slug)) {
      const timer = setTimeout(() => setOpenSlug(slug), 350);
      return () => clearTimeout(timer);
    }
  }, []);

  // toolbox cross-reference entry point
  useEffect(() => {
    const onOpenCase = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      if (projects.some((p) => p.slug === slug)) openCase(slug);
    };
    window.addEventListener("open-case", onOpenCase);
    return () => window.removeEventListener("open-case", onOpenCase);
  }, [openCase]);

  return (
    <section className="section work-section" id="work" aria-labelledby="work-head">
      <SectionHead
        id="work-head"
        num="01"
        kicker="work"
        title="Selected work"
        accent={["work"]}
        sub="Click any card for the case study: the problem, the build and the outcome."
      />
      {horizontal ? (
        <HorizontalTrack onOpen={openCase} />
      ) : (
        <div className="work-stack">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} onOpen={openCase} />
          ))}
        </div>
      )}
      <div className="work-more">
        <a className="text-link" href="https://apps.34cats.com" target="_blank" rel="noreferrer">
          More experiments at apps.34cats.com <span aria-hidden="true">↗</span>
        </a>
        <HiddenCat id="work" hint={catHints[3].hint} className="work-cat" />
      </div>
      <CaseDrawer project={openProject} onClose={closeCase} />
    </section>
  );
}

/** Desktop: vertical scroll is translated into horizontal travel. */
function HorizontalTrack({ onOpen }: { onOpen: (slug: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (progress) => -travelRef.current * progress);

  useLayoutEffect(() => {
    const measure = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      travelRef.current = Math.max(0, track.scrollWidth - section.clientWidth);
      section.style.height = `${window.innerHeight + travelRef.current}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="work-rail" ref={sectionRef}>
      <div className="work-rail-sticky">
        <motion.div className="work-rail-track" ref={trackRef} style={{ x }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} onOpen={onOpen} compact />
          ))}
          <div className="work-rail-end" aria-hidden="true">
            <span>fin</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  compact = false,
}: {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <article
      className={`work-card ${compact ? "is-compact" : ""} ${project.placeholder ? "is-placeholder" : ""}`}
      data-cursor="open"
      onClick={() => onOpen(project.slug)}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen(project.slug);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open case study: ${project.title}`}
    >
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-url">
            {project.url ? project.url.replace(/^https?:\/\//, "") : "34cats.com/soon"}
          </span>
        </div>
        <div className="browser-body">
          {project.video ? (
            <video
              ref={videoRef}
              src={asset(project.video)}
              poster={asset(project.image)}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : (
            <Image
              src={asset(project.image)}
              alt={`${project.title} interface`}
              width={1024}
              height={640}
              sizes="(max-width: 899px) 92vw, 620px"
            />
          )}
          {project.video ? null : <span className="browser-demo-badge">▶ demo</span>}
        </div>
      </div>
      <div className="work-card-copy">
        <div className="work-card-top">
          <h3 className="work-card-title">{project.title}</h3>
          <span className="work-card-index">
            {String(index + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <p className="work-card-pitch">{project.pitch}</p>
        <p className="work-card-meta">
          <span>{project.role}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{project.association}</span>
        </p>
        <ul className="tag-chips work-card-tags" aria-label="Stack">
          {project.tech.slice(0, compact ? 4 : 99).map((tech) => (
            <li className="chip" key={tech}>
              {tech}
            </li>
          ))}
          {compact && project.tech.length > 4 ? <li className="chip">+{project.tech.length - 4}</li> : null}
        </ul>
        {project.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
      </div>
    </article>
  );
}

function CaseDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehavior(project !== null, panelRef, onClose);

  return (
    <AnimatePresence>
      {project ? (
        <div className="case-root" role="presentation">
          <motion.div
            className="case-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            className="case-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-title-${project.slug}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
          >
            <header className="case-header">
              <div>
                <p className="eyebrow">
                  <span className="num">case</span>
                  {project.year} · {project.association}
                </p>
                <h2 id={`case-title-${project.slug}`} className="case-title">
                  {project.title}
                </h2>
                <p className="case-role">
                  {project.role}
                  {project.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
                </p>
              </div>
              <button type="button" className="case-close" onClick={onClose} aria-label="Close case study">
                <CloseIcon width={18} height={18} />
              </button>
            </header>
            <div className="case-body">
              <section className="case-block">
                <h3 className="case-block-label">problem</h3>
                <p>{project.caseStudy.problem}</p>
              </section>
              <section className="case-block">
                <h3 className="case-block-label">what I built</h3>
                <ul>
                  {project.caseStudy.built.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </section>
              <section className="case-block">
                <h3 className="case-block-label">outcome</h3>
                <p>{project.caseStudy.outcome}</p>
                <div className="case-metrics">
                  {project.caseStudy.metrics.map((metric) => (
                    <div className="case-metric" key={metric.label}>
                      <span className="case-metric-value">{metric.value}</span>
                      <span className="case-metric-label">
                        {metric.label}
                        {metric.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="case-block">
                <h3 className="case-block-label">stack</h3>
                <ul className="tag-chips" aria-label="Stack">
                  {project.caseStudy.stack.map((tech) => (
                    <li className="chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="case-block">
                <h3 className="case-block-label">gallery</h3>
                <div className="case-gallery">
                  {project.caseStudy.gallery.map((image, i) => (
                    <Image
                      key={image}
                      src={asset(image)}
                      alt={`${project.title} gallery image ${i + 1} (placeholder)`}
                      width={480}
                      height={300}
                      className="case-gallery-img"
                    />
                  ))}
                </div>
              </section>
              {project.caseStudy.links.length > 0 ? (
                <section className="case-block">
                  <h3 className="case-block-label">links</h3>
                  <div className="case-links">
                    {project.caseStudy.links.map((link) => (
                      <a key={link.href} className="btn btn-ghost" href={link.href} target="_blank" rel="noreferrer">
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
              <p className="case-footnote">
                Case studies for {project.title}. Reach me at{" "}
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                for the long version.
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

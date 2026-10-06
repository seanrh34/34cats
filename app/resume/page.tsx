import type { Metadata } from "next";
import Link from "next/link";
import { asset, education, experience, site, toolbox } from "../data";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Sean Richardson Hardjanto, AI & software engineer and NUS Computer Science student in Singapore.",
  alternates: { canonical: "/resume/" },
};

export default function ResumePage() {
  return (
    <main id="main" className="resume-page">
      <section className="resume-hero">
        <p className="eyebrow">
          <span className="num">[cv]</span>curriculum vitae
        </p>
        <h1 className="resume-title">
          Sean Richardson <span className="display-em">Hardjanto</span>
        </h1>
        <p className="resume-sub">
          {site.tagline} · {site.location}
        </p>
        <div className="resume-cta-row">
          <a className="btn btn-primary" href={asset(site.resumePath)} download>
            Download PDF <span aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-ghost" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link className="btn btn-ghost" href="/">
            ← Back to portfolio
          </Link>
        </div>
      </section>

      <div className="resume-grid">
        <aside className="resume-summary">
          <section className="resume-block">
            <h2 className="resume-block-title">Experience</h2>
            <ul className="resume-exp-list">
              {experience.map((entry) => (
                <li key={entry.id}>
                  <p className="resume-exp-period">{entry.period}</p>
                  <p className="resume-exp-role">
                    <strong>{entry.role}</strong> · {entry.company}
                  </p>
                  <p className="resume-exp-summary">{entry.summary}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="resume-block">
            <h2 className="resume-block-title">Education</h2>
            <ul className="resume-edu-list">
              {education.map((card) => (
                <li key={card.id}>
                  <p className="resume-exp-period">{card.period}</p>
                  <p className="resume-exp-role">
                    <strong>{card.headline}</strong>
                  </p>
                  <p className="resume-exp-summary">{card.school}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="resume-block">
            <h2 className="resume-block-title">Toolbox</h2>
            <div className="resume-toolbox">
              {toolbox.map((group) => (
                <p key={group.group} className="resume-tool-group">
                  <span className="resume-tool-label">{group.group}</span>
                  {group.skills.join(" · ")}
                </p>
              ))}
            </div>
          </section>
          <section className="resume-block">
            <h2 className="resume-block-title">Find me</h2>
            <ul className="resume-socials">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="resume-pdf-col" aria-label="Résumé PDF preview">
          <div className="resume-frame">
            <object data={asset(site.resumePath)} type="application/pdf" aria-label="Résumé PDF">
              <p className="resume-fallback">
                Your browser can&apos;t display the PDF inline.{" "}
                <a className="text-link" href={asset(site.resumePath)}>
                  Download it
                </a>{" "}
                or read the summary on the left.
              </p>
            </object>
          </div>
          <p className="resume-frame-note">
            PDFs don&apos;t embed on most phones. The summary column covers the highlights.
          </p>
        </section>
      </div>
    </main>
  );
}

"use client";

import { nowItems, site } from "../data";
import { Clock } from "./clock";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Now() {
  return (
    <section className="section now-section" id="now" aria-labelledby="now-head">
      <SectionHead
        id="now-head"
        num="06"
        kicker="now"
        title="Right now, in bento form."
        accent={["bento", "form."]}
        sub="A living snapshot — placeholders until Sean fills them in."
      />
      <div className="now-grid">
        {nowItems.map((item, index) => (
          <Reveal key={item.label} className={`now-cell now-cell-${item.label.toLowerCase()}`} delay={index * 0.07} y={20}>
            <p className="now-label">
              <span aria-hidden="true">[</span>
              {item.label}
              <span aria-hidden="true">]</span>
              {item.placeholder ? <span className="placeholder-flag">placeholder</span> : null}
            </p>
            <p className="now-text">{item.text}</p>
          </Reveal>
        ))}
        <Reveal className="now-cell now-cell-clock" delay={0.28} y={20}>
          <p className="now-label">
            <span aria-hidden="true">[</span>location<span aria-hidden="true">]</span>
          </p>
          <p className="now-location">
            {site.location} <span aria-hidden="true">·</span> SGT
          </p>
          <Clock className="now-clock" />
        </Reveal>
      </div>
    </section>
  );
}

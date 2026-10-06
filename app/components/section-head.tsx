"use client";

import { SplitWords } from "./reveal";
import { catHints } from "../data";
import { HiddenCat } from "./cats";
import type { CSSProperties } from "react";

type SectionHeadProps = {
  num?: string;
  kicker: string;
  title: string;
  accent?: string[];
  sub?: string;
  catId?: string;
  catStyle?: CSSProperties;
  id?: string;
};

/** Numbered mono label + display heading + optional intro. */
export function SectionHead({ num, kicker, title, accent, sub, catId, catStyle, id }: SectionHeadProps) {
  const catHint = catId ? catHints.find((c) => c.id === catId) : undefined;
  return (
    <div className="section-head" id={id}>
      <p className="eyebrow">
        {num ? <span className="num">[{num}]</span> : null}
        {kicker}
      </p>
      <SplitWords text={title} className="section-title" accent={accent} />
      <div>
        {sub ? <p className="section-sub">{sub}</p> : null}
        {catId && catHint ? <HiddenCat id={catId} hint={catHint.hint} style={catStyle} /> : null}
      </div>
    </div>
  );
}

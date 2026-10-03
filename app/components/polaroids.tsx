"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { asset, catHints, polaroids } from "../data";
import { HiddenCat } from "./cats";
import { useMediaQuery } from "./lib";
import { SectionHead } from "./section-head";
type Placement = { x: number; y: number; rotate: number };

const INITIAL: Placement[] = [
  { x: -190, y: -26, rotate: -6 },
  { x: -44, y: 8, rotate: 3 },
  { x: 104, y: -52, rotate: -2 },
  { x: 22, y: 88, rotate: 7 },
  { x: -128, y: 96, rotate: 2 },
  { x: 196, y: 60, rotate: -5 },
];

const randomPlacement = (): Placement => ({
  x: (Math.random() - 0.5) * 430,
  y: (Math.random() - 0.5) * 190,
  rotate: Math.random() * 14 - 7,
});

export function OffClock() {
  const reduced = useReducedMotion();
  const narrow = useMediaQuery("(max-width: 719px)");
  const coarse = useMediaQuery("(pointer: coarse)");
  const isRow = narrow || coarse;
  const [placements, setPlacements] = useState<Placement[]>(INITIAL);
  const [topIndex, setTopIndex] = useState(polaroids.length);

  const bringToFront = (index: number) => setTopIndex(index);

  const shuffle = () => {
    setPlacements(polaroids.map(() => randomPlacement()));
    setTopIndex((top) => top + 1);
  };

  const zIndexFor = (index: number) => (index === topIndex % polaroids.length ? 60 : 10 + index);

  return (
    <section className="section offclock-section" id="offclock" aria-labelledby="offclock-head">
      <SectionHead
        id="offclock-head"
        num="05"
        kicker="off the clock"
        title="A small pile of evidence."
        accent={["evidence."]}
        sub="Drag the polaroids around — they don't mind."
      />
      <div className="polaroid-pile-wrap">
        {isRow ? (
          <ul className="polaroid-row" aria-label="Life off the clock — swipeable photos">
            {polaroids.map((photo) => (
              <li key={photo.id} className="polaroid-row-item">
                <Image
                  src={asset(photo.image)}
                  alt={`${photo.caption} (placeholder photo)`}
                  width={224}
                  height={280}
                  sizes="224px"
                />
                <span className="polaroid-caption">{photo.caption}</span>
              </li>
            ))}
          </ul>
        ) : (
          <PolaroidPile placements={placements} zIndexFor={zIndexFor} bringToFront={bringToFront} reduced={Boolean(reduced)} />
        )}
        <p className="polaroid-hint" aria-hidden="true">
          {isRow ? "← swipe →" : "grab a photo and drag"}
        </p>
        {!isRow ? (
          <div className="offclock-actions">
            <button type="button" className="btn btn-ghost" onClick={shuffle}>
              shuffle the pile
            </button>
            <p className="offclock-note">
              photos are placeholders — swap them in <code>public/placeholders/</code>
            </p>
          </div>
        ) : null}
      </div>
      <HiddenCat id="offclock" hint={catHints[7].hint} className="offclock-cat" />
    </section>
  );
}

function PolaroidPile({
  placements,
  zIndexFor,
  bringToFront,
  reduced,
}: {
  placements: Placement[];
  zIndexFor: (index: number) => number;
  bringToFront: (index: number) => void;
  reduced: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="polaroid-pile" ref={containerRef} data-cursor="drag">
      {polaroids.map((photo, index) => (
        <motion.div
          key={photo.id}
          className="polaroid"
          style={{ zIndex: zIndexFor(index) } as CSSProperties}
          initial={false}
          animate={{ x: placements[index].x, y: placements[index].y, rotate: placements[index].rotate }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 24 }}
          drag
          dragConstraints={containerRef}
          dragElastic={reduced ? 0 : 0.18}
          dragMomentum={false}
          whileDrag={reduced ? undefined : { scale: 1.06 }}
          onDragStart={() => bringToFront(index)}
        >
          <div className="polaroid-frame">
            <Image
              src={asset(photo.image)}
              alt={`${photo.caption} (placeholder photo)`}
              width={224}
              height={280}
              sizes="224px"
              draggable={false}
            />
            <span className="polaroid-caption">{photo.caption}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

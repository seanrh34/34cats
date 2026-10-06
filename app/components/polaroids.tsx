"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { asset, catHints, polaroids } from "../data";
import { HiddenCat } from "./cats";
import { PlayIcon, SoundOffIcon, SoundOnIcon } from "./icons";
import { useAnimationsEnabled, useIsClient, useMediaQuery, usePrefersReducedMotion } from "./lib";
import { SectionHead } from "./section-head";

type Placement = { x: number; y: number; rotate: number };

const INITIAL: Placement[] = [
  { x: -190, y: -26, rotate: -6 },
  { x: -44, y: 8, rotate: 3 },
  { x: 104, y: -52, rotate: -2 },
  { x: 22, y: 88, rotate: 7 },
];

const randomPlacement = (): Placement => ({
  x: (Math.random() - 0.5) * 430,
  y: (Math.random() - 0.5) * 190,
  rotate: Math.random() * 14 - 7,
});

export function OffClock() {
  const narrow = useMediaQuery("(max-width: 719px)");
  const coarse = useMediaQuery("(pointer: coarse)");
  const reducedMotion = usePrefersReducedMotion();
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
      <VideoBand />
      <div className="polaroid-pile-wrap">
        {isRow ? (
          <ul className="polaroid-row" aria-label="Photos from outside of code">
            {polaroids.map((photo) => (
              <li key={photo.id} className="polaroid-row-item">
                <Image src={asset(photo.image)} alt={photo.caption} width={224} height={280} sizes="224px" />
                <span className="polaroid-caption">{photo.caption}</span>
              </li>
            ))}
          </ul>
        ) : (
          <PolaroidPile
            placements={placements}
            zIndexFor={zIndexFor}
            bringToFront={bringToFront}
            reduced={Boolean(reducedMotion)}
          />
        )}
        <p className="polaroid-hint" aria-hidden="true">
          {isRow ? "← swipe →" : "grab a photo and drag"}
        </p>
        {!isRow ? (
          <div className="offclock-actions">
            <button type="button" className="btn btn-ghost" onClick={shuffle}>
              shuffle the pile
            </button>
          </div>
        ) : null}
      </div>
      <HiddenCat id="offclock" hint={catHints[7].hint} className="offclock-cat" />
    </section>
  );
}

/**
 * Full-bleed highlight band. Autoplays only while in view, and only when motion
 * is welcome; otherwise it rests on the poster behind a play button.
 */
function VideoBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animate = useAnimationsEnabled();
  const reduced = usePrefersReducedMotion();
  const isClient = useIsClient();
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [manualStart, setManualStart] = useState(false);

  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setReady(true);
      },
      { rootMargin: "300px 0px", threshold: 0.1 },
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    const canPlay = !reduced || manualStart;
    if (inView && canPlay) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, ready, reduced, manualStart]);

  const showPlay = isClient && reduced && !playing;

  return (
    <div className="offclock-video-band" ref={bandRef}>
      <motion.div className="offclock-video-parallax" style={animate ? { y, scale } : undefined}>
        <video
          ref={videoRef}
          className="offclock-video"
          src={asset("/videos/smuvc25-last-bout.mp4")}
          poster={asset("/videos/smuvc25-poster.jpg")}
          muted
          loop
          playsInline
          preload={ready ? "auto" : "none"}
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </motion.div>
      <div className="offclock-video-scrim" aria-hidden="true" />
      <div className="offclock-video-overlay">
        <SectionHead
          id="offclock-head"
          num="05"
          kicker="outside code"
          title="Outside of code"
          accent={["code"]}
        />
        <p className="offclock-video-caption">SMUVC 2025 · last bout</p>
      </div>
      {showPlay ? (
        <button
          type="button"
          className="offclock-play"
          onClick={() => {
            setManualStart(true);
            void videoRef.current?.play().catch(() => {});
          }}
          aria-label="Play the SMUVC 2025 highlight"
        >
          <PlayIcon width={24} height={24} />
        </button>
      ) : null}
      <button
        type="button"
        className="offclock-sound"
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={!muted}
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? <SoundOffIcon width={15} height={15} /> : <SoundOnIcon width={15} height={15} />}
        <span>{muted ? "sound off" : "sound on"}</span>
      </button>
    </div>
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
              alt={photo.caption}
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

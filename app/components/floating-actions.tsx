"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { asset, site } from "../data";
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon } from "./icons";

const NEAR_BOTTOM_PX = 200;
const HERO_REVEAL_RATIO = 0.6;

/**
 * Bottom-right quick actions: jump to the bottom (contact/footer) or back to
 * the top once you are already there, plus a one-click résumé download.
 */
export function FloatingActions() {
  const reduced = useReducedMotion();
  const [jumpVisible, setJumpVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const gap = doc.scrollHeight - window.innerHeight - window.scrollY;
      setAtBottom(gap <= NEAR_BOTTOM_PX);
      setJumpVisible(window.scrollY > window.innerHeight * HERO_REVEAL_RATIO);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const jump = useCallback(() => {
    window.scrollTo({
      top: atBottom ? 0 : document.documentElement.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [atBottom, reduced]);

  const jumpLabel = atBottom ? "Back to top" : "Jump to contact";

  return (
    <div className="fab-stack">
      <AnimatePresence initial={false}>
        {jumpVisible ? (
          <motion.button
            key="jump"
            type="button"
            className="fab"
            onClick={jump}
            aria-label={jumpLabel}
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduced ? undefined : { y: -2 }}
          >
            {atBottom ? <ArrowUpIcon width={19} height={19} /> : <ArrowDownIcon width={19} height={19} />}
            <span className="fab-tooltip" aria-hidden="true">
              {jumpLabel}
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.a
        className="fab"
        href={asset(site.resumePath)}
        download
        aria-label="Download résumé (PDF)"
        whileHover={reduced ? undefined : { y: -2 }}
      >
        <DownloadIcon width={19} height={19} />
        <span className="fab-tooltip" aria-hidden="true">
          Download résumé
        </span>
      </motion.a>
    </div>
  );
}

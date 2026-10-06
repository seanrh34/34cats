"use client";

import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "./lib";

const CLICKABLE = "a, button, [role='button'], summary, input, textarea, select, [data-cursor]";

/** Cat-paw cursor (fine pointers only). Position tracks the pointer exactly; only scale springs. */
export function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      const tagged = target?.closest?.("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      setLabel(tagged);
      setActive(Boolean(target?.closest?.(CLICKABLE)));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`cursor-paw ${active ? "is-active" : ""} ${label ? "has-label" : ""}`}
      aria-hidden="true"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="cursor-paw-grow"
        animate={{ scale: active ? 1.45 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <span className="cursor-paw-glow" />
        <motion.div
          className="cursor-paw-squish"
          animate={{ scaleX: pressed ? 1.08 : 1, scaleY: pressed ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        >
          <svg className="cursor-paw-svg" viewBox="0 0 28 28" width={26} height={26}>
            {/* hotspot (toes, top-centre) sits at viewBox (14, 2.5) → wrapper origin */}
            <g transform="translate(-14 -2.5)">
              <ellipse className="paw-toe paw-toe-1" cx="4.8" cy="11.2" rx="2.9" ry="3.5" />
              <ellipse className="paw-toe paw-toe-2" cx="10.4" cy="6.6" rx="3.2" ry="3.8" />
              <ellipse className="paw-toe paw-toe-3" cx="17.6" cy="6.6" rx="3.2" ry="3.8" />
              <ellipse className="paw-toe paw-toe-4" cx="23.2" cy="11.2" rx="2.9" ry="3.5" />
              <path
                className="paw-pad"
                d="M14 14.8C10.6 14.8 7.8 16.7 7.8 19.5c0 1.6.9 3 2.2 3.8-1 .7-1.7 1.7-1.7 2.9 0 1.1 2.5 1.6 5.7 1.6s5.7-.5 5.7-1.6c0-1.2-.7-2.2-1.7-2.9 1.3-.8 2.2-2.2 2.2-3.8 0-2.8-2.8-4.7-6.2-4.7Z"
              />
            </g>
          </svg>
        </motion.div>
      </motion.div>
      {label ? <span className="cursor-label">{label}</span> : null}
    </motion.div>
  );
}

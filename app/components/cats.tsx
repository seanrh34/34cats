"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import { catHints, catTotal } from "../data";
import { store } from "./lib";
import { CatSilhouette, Paw } from "./icons";
import { useToast } from "./toast";

const STORAGE_KEY = "34cats-found-v1";
const VALID_IDS = new Set(catHints.map((c) => c.id));

/** Found-cats state lives in localStorage behind a stable external store. */
const foundStore = (() => {
  let cache: string[] | null = null;
  let listeners: Array<() => void> = [];
  const read = (): string[] => {
    if (cache === null) {
      cache = store.get<string[]>(STORAGE_KEY, []).filter((id) => VALID_IDS.has(id));
    }
    return cache;
  };
  return {
    subscribe(onStoreChange: () => void) {
      listeners.push(onStoreChange);
      return () => {
        listeners = listeners.filter((l) => l !== onStoreChange);
      };
    },
    get: read,
    set(next: string[]) {
      cache = next;
      store.set(STORAGE_KEY, next);
      listeners.forEach((l) => l());
    },
  };
})();

function useFoundCats(): string[] {
  return useSyncExternalStore(foundStore.subscribe, foundStore.get, () => EMPTY);
}
const EMPTY: string[] = [];

type CatsApi = {
  found: string[];
  total: number;
  find: (id: string) => void;
  burst: () => void;
  hints: typeof catHints;
};

const CatsContext = createContext<CatsApi | null>(null);

export function useCats(): CatsApi {
  const ctx = useContext(CatsContext);
  if (!ctx) throw new Error("useCats must be used inside CatProvider");
  return ctx;
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function CatProvider({ children }: { children: ReactNode }) {
  const found = useFoundCats();
  const [burstKey, setBurstKey] = useState(0);
  const toast = useToast();
  const celebrated = useRef(false);

  const burst = useCallback(() => setBurstKey((k) => k + 1), []);

  const find = useCallback(
    (id: string) => {
      const current = foundStore.get();
      if (current.includes(id)) return;
      const next = [...current, id];
      foundStore.set(next);
      if (next.length >= catTotal && !celebrated.current) {
        celebrated.current = true;
        setBurstKey((k) => k + 1);
        toast({ title: "meow! you found every cat", detail: "The other 25 are napping." });
      } else {
        toast({ title: "meow", detail: `${next.length}/${catTotal} cats found` });
      }
    },
    [toast],
  );

  useEffect(() => {
    let index = 0;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest("input, textarea, [contenteditable]")) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      index = key === KONAMI[index] ? index + 1 : key === KONAMI[0] ? 1 : 0;
      if (index === KONAMI.length) {
        index = 0;
        burst();
        toast({ title: "konami accepted", detail: "A cat burst has been dispatched." });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [burst, toast]);

  const api = useMemo<CatsApi>(
    () => ({ found, total: catTotal, find, burst, hints: catHints }),
    [found, find, burst],
  );

  return (
    <CatsContext.Provider value={api}>
      {children}
      {burstKey > 0 ? <CatBurst key={burstKey} onDone={() => setBurstKey(0)} /> : null}
    </CatsContext.Provider>
  );
}

/** Deterministic per-index pseudo-random in [0, 1) — pure, SSR-stable. */
function seeded(i: number, salt: number): number {
  let x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  x -= Math.floor(x);
  return x;
}

/** Cat-paw confetti burst. */
function CatBurst({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [gone, setGone] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 26 + seeded(i, 1) * 0.6;
        const distance = 140 + seeded(i, 2) * 300;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 60,
          rotate: seeded(i, 3) * 540 - 270,
          scale: 0.5 + seeded(i, 4) * 0.9,
          delay: seeded(i, 5) * 0.12,
          kind: i % 3,
        };
      }),
    [],
  );

  useEffect(() => {
    const t = setTimeout(
      () => {
        setGone(true);
        onDone();
      },
      reduced ? 60 : 1900,
    );
    return () => clearTimeout(t);
  }, [onDone, reduced]);

  if (reduced || gone) return null;

  return (
    <div className="cat-burst" aria-hidden="true">
      {particles.map((p, i) => {
        const Icon = p.kind === 2 ? CatSilhouette : Paw;
        const color = ["var(--accent)", "var(--mint)", "var(--ink)"][p.kind];
        return (
          <motion.span
            key={i}
            className="cat-burst-particle"
            style={{ color }}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
            animate={{ x: p.x, y: [0, p.y * 0.72, p.y + 420], scale: p.scale, rotate: p.rotate, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, delay: p.delay, times: [0, 0.18, 0.55, 1], ease: [0.16, 0.84, 0.44, 1] }}
          >
            <Icon width={16 + p.kind * 4} height={16 + p.kind * 4} />
          </motion.span>
        );
      })}
    </div>
  );
}

/** A tastefully hidden cat. Click it. */
export function HiddenCat({
  id,
  hint,
  style,
  className = "",
}: {
  id: string;
  hint: string;
  style?: CSSProperties;
  className?: string;
}) {
  const { found, find } = useCats();
  const toast = useToast();
  const [hop, setHop] = useState(false);
  const isFound = found.includes(id);

  return (
    <motion.button
      type="button"
      className={`hidden-cat ${isFound ? "is-found" : ""} ${className}`}
      style={style}
      data-cursor="meow"
      aria-label={`Hidden cat — ${hint}`}
      aria-pressed={isFound}
      animate={hop ? { y: [0, -14, 0], rotate: [0, -10, 4, 0] } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => {
        setHop(true);
        setTimeout(() => setHop(false), 520);
        if (!isFound) find(id);
        else toast({ title: "meow (already found)" });
      }}
    >
      <CatSilhouette width={19} height={19} />
    </motion.button>
  );
}

/** Nav counter with hint popover. */
export function CatCounter() {
  const { found, total, hints } = useCats();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const remaining = hints.filter((h) => !found.includes(h.id));

  return (
    <div className="cat-counter-wrap" ref={wrapRef}>
      <button
        type="button"
        className="nav-icon-btn cat-counter"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Cat hunt: ${found.length} of ${total} found. Show hints`}
        onClick={() => setOpen((o) => !o)}
      >
        <CatSilhouette width={14} height={14} />
        <span className="cat-counter-num">
          {found.length}/{total}
        </span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="cat-hints"
            role="dialog"
            aria-label="Cat hunt hints"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="cat-hints-title">the 34cats hunt</p>
            {remaining.length > 0 ? (
              <>
                <p className="cat-hints-sub">{remaining.length} still hiding — a nudge, no spoilers:</p>
                <ul className="cat-hints-list">
                  {remaining.map((h) => (
                    <li key={h.id}>{h.hint}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="cat-hints-sub">All 9 found. The other 25 are napping.</p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

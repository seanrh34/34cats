"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { asset, sectionAnchors, site } from "../data";
import { useDialogBehavior, useTheme } from "./lib";
import { useToast } from "./toast";

type PaletteApi = { open: () => void; isOpen: boolean };
const PaletteContext = createContext<PaletteApi>({ open: () => {}, isOpen: false });

/** Lowercase and strip diacritics so "res" matches "Résumé". */
const fold = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function usePalette(): PaletteApi {
  return useContext(PaletteContext);
}

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Section" | "Action" | "Site";
  keywords?: string;
  run: () => void;
};

/** Subsequence fuzzy match with a small scoring bonus for word starts. */
function fuzzyScore(query: string, target: string): number | null {
  if (!query) return 0;
  const q = fold(query);
  const t = fold(target);
  let qi = 0;
  let score = 0;
  let streak = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      qi++;
      streak++;
      score += 1 + streak * 0.5 + (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "/" ? 2 : 0);
    } else {
      streak = 0;
    }
  }
  if (qi < q.length) return null;
  return score - t.length * 0.01;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const api = useMemo(() => ({ open, isOpen }), [open, isOpen]);

  // global hotkeys: ⌘K / Ctrl+K toggles, "/" opens (when not typing)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable]");
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteContext.Provider value={api}>
      {children}
      <CommandPalette open={isOpen} onClose={close} />
    </PaletteContext.Provider>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        // keyed remount: every open starts with a fresh query + selection
        <PaletteInner key="palette" onClose={onClose} />
      ) : null}
    </AnimatePresence>
  );
}

function PaletteInner({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const toast = useToast();
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useDialogBehavior(true, panelRef, onClose);

  const goToSection = useCallback(
    (anchorId: string) => {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      } else {
        router.push(`/#${anchorId}`);
      }
    },
    [router],
  );

  const commands = useMemo<Command[]>(() => {
    const sectionCommands: Command[] = sectionAnchors.map((s) => ({
      id: `section-${s.id}`,
      label: s.num ? `${s.num} · ${s.label}` : s.label,
      hint: "jump",
      group: "Section" as const,
      keywords: `go to section scroll ${s.label} ${s.id}`,
      run: () => goToSection(s.id),
    }));
    const actions: Command[] = [
      {
        id: "resume-open",
        label: "Open résumé page",
        hint: "page",
        group: "Action",
        keywords: "cv curriculum vitae resume",
        run: () => router.push("/resume"),
      },
      {
        id: "resume-download",
        label: "Download résumé PDF",
        hint: "pdf",
        group: "Action",
        keywords: "cv resume pdf download",
        run: () => {
          const a = document.createElement("a");
          a.href = asset(site.resumePath);
          a.download = "";
          a.click();
        },
      },
      {
        id: "email-copy",
        label: `Copy email — ${site.email}`,
        hint: "copy",
        group: "Action",
        keywords: "mail contact",
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            toast({ title: "email copied", detail: site.email });
          } catch {
            toast({ title: "couldn't copy", detail: site.email });
          }
        },
      },
      {
        id: "theme-toggle",
        label: "Toggle light / dark theme",
        hint: "theme",
        group: "Action",
        keywords: "dark light mode night paper toggle",
        run: () => {
          toggleTheme();
          toast({ title: "theme toggled" });
        },
      },
    ];
    const siteCommands: Command[] = site.socials.map((s) => ({
      id: `site-${s.label}`,
      label: `Open ${s.label}`,
      hint: "↗",
      group: "Site",
      keywords: `${s.label} external link`,
      run: () => window.open(s.href, "_blank", "noreferrer"),
    }));
    return [...sectionCommands, ...actions, ...siteCommands];
  }, [goToSection, router, toast, toggleTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const ranked = commands
      .map((command) => {
        const score = fuzzyScore(query.trim(), `${command.label} ${command.keywords ?? ""}`);
        return score === null ? null : { command, score };
      })
      .filter((entry): entry is { command: Command; score: number } => entry !== null)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.command);
    // Keep groups contiguous (so arrow-key order matches what's rendered), ordered by each group's best match.
    const groupOrder = [...new Set(ranked.map((command) => command.group))];
    return groupOrder.flatMap((group) => ranked.filter((command) => command.group === group));
  }, [commands, query]);

  const selectedIndex = Math.min(selected, Math.max(0, filtered.length - 1));

  const runCommand = useCallback(
    (command: Command) => {
      onClose();
      setTimeout(() => command.run(), 30);
    },
    [onClose],
  );

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((prev) => (filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setSelected(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setSelected(Math.max(0, filtered.length - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = filtered[selectedIndex];
      if (command) runCommand(command);
    }
  };

  useEffect(() => {
    const item = listRef.current?.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`);
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const groups = [...new Set(filtered.map((command) => command.group))];

  return (
    <div className="palette-root" role="presentation">
      <motion.div
        className="palette-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        className="palette-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.985 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="palette-input-row">
          <span className="palette-glyph" aria-hidden="true">
            ⌘
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Jump anywhere, copy email, toggle theme…"
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="palette-esc" aria-hidden="true">
            esc
          </kbd>
        </div>
        <div className="palette-list" ref={listRef} role="listbox" aria-label="Commands">
          {filtered.length === 0 ? (
            <p className="palette-empty">nothing matches — try “work”, “pdf” or “cat”-adjacent keywords</p>
          ) : (
            groups.map((group) => {
              const items = filtered.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="palette-group">
                  <p className="palette-group-label">{group}</p>
                  {items.map((command) => {
                    const index = filtered.indexOf(command);
                    return (
                      <button
                        key={command.id}
                        type="button"
                        role="option"
                        aria-selected={index === selectedIndex}
                        data-index={index}
                        className={`palette-item ${index === selectedIndex ? "is-selected" : ""}`}
                        onMouseEnter={() => setSelected(index)}
                        onClick={() => runCommand(command)}
                      >
                        <span className="palette-item-label">{command.label}</span>
                        {command.hint ? <span className="palette-item-hint">{command.hint}</span> : null}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
        <div className="palette-foot" aria-hidden="true">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </motion.div>
    </div>
  );
}

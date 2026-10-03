"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { RefObject } from "react";

/** MatchMedia as an external store (SSR-safe, no setState-in-effect). */
const mediaSubscriptions = new Map<string, (onStoreChange: () => void) => () => void>();

function getMediaSubscription(query: string) {
  let subscribe = mediaSubscriptions.get(query);
  if (!subscribe) {
    subscribe = (onStoreChange: () => void) => {
      const mql = matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    };
    mediaSubscriptions.set(query, subscribe);
  }
  return subscribe;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    getMediaSubscription(query),
    () => matchMedia(query).matches,
    () => false,
  );
}

const subscribeNothing = () => () => {};

/**
 * False during SSR + hydration, true after — lets render branches match the
 * server output first, then adapt (e.g. to prefers-reduced-motion).
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

/**
 * Whether entrance animations should run: true on the server and during
 * hydration (so markup matches), then settles to `!prefers-reduced-motion`.
 */
export function useAnimationsEnabled(): boolean {
  const isClient = useIsClient();
  const reduced = usePrefersReducedMotion();
  return !(isClient && reduced);
}

/** prefers-reduced-motion as a stable external store (null-safe). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    getMediaSubscription("(prefers-reduced-motion: reduce)"),
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type Ref<T> = RefObject<T | null>;

/** Focus trap + Esc + scroll lock + focus restore for dialogs. */
export function useDialogBehavior(open: boolean, containerRef: Ref<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => node.offsetParent !== null || node === document.activeElement);
    focusables()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, [open, containerRef, onClose]);
}

/** LocalStorage-safe JSON read/write. */
export const store = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode etc. */
    }
  },
};

/** Theme lives on <html data-theme> (set pre-paint by the inline script); read it as an external store. */
const themeObserverTargets = new Set<() => void>();
let themeObserver: MutationObserver | null = null;

function subscribeTheme(onStoreChange: () => void) {
  themeObserverTargets.add(onStoreChange);
  if (!themeObserver) {
    themeObserver = new MutationObserver(() => {
      themeObserverTargets.forEach((cb) => cb());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  return () => {
    themeObserverTargets.delete(onStoreChange);
    if (themeObserverTargets.size === 0 && themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark" as const,
  );
  const setTheme = (next: "dark" | "light") => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("34cats-theme", next);
    } catch {
      /* ignore */
    }
  };
  return { theme, setTheme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark") };
}

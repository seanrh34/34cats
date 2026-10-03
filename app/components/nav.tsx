"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks, sectionAnchors, site } from "../data";
import { usePalette } from "./command-palette";
import { CatCounter } from "./cats";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./icons";
import { useDialogBehavior, useTheme } from "./lib";

export function Nav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { open: openPalette } = usePalette();
  const reduced = useReducedMotion();
  const onHome = pathname === "/";
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useDialogBehavior(menuOpen, menuRef, closeMenu);

  // close the mobile menu whenever the route changes (render-phase adjust)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // animated active indicator for the section in view
  useEffect(() => {
    if (!onHome) return;
    const sections = sectionAnchors
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <>
      <header className="nav-shell">
        <nav className="nav-pill" aria-label="Primary navigation">
          <Link className="nav-wordmark" href="/" aria-label="Sean Hardjanto — home">
            <span className="nav-wordmark-num">34</span>cats
          </Link>
          <ul className="nav-links">
            {navLinks.map((link) => {
              const href = onHome ? `#${link.id}` : `/#${link.id}`;
              const isActive = onHome && activeId === link.id;
              return (
                <li key={link.id}>
                  <Link href={href} className={`nav-link ${isActive ? "is-active" : ""}`} data-active={isActive || undefined}>
                    {isActive && !reduced ? (
                      <motion.span layoutId="nav-active-pill" className="nav-active-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                    ) : null}
                    <span className="nav-link-num">{link.num}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-actions">
            <button
              type="button"
              className="nav-icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light (paper) theme" : "Switch to dark (night-shift) theme"}
              aria-pressed={theme === "light"}
            >
              {theme === "dark" ? <SunIcon width={15} height={15} /> : <MoonIcon width={15} height={15} />}
            </button>
            <button type="button" className="nav-icon-btn nav-kbtn" onClick={openPalette} aria-label="Open command palette (⌘K)">
              <span aria-hidden="true">⌘K</span>
            </button>
            <CatCounter />
            <button
              type="button"
              className="nav-icon-btn nav-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon width={17} height={17} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button type="button" className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <CloseIcon width={20} height={20} />
            </button>
            <nav className="mobile-menu-links" aria-label="All sections">
              {sectionAnchors.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/#${link.id}`} onClick={() => setMenuOpen(false)}>
                    {link.num ? <span className="mobile-link-num">[{link.num}]</span> : null}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + sectionAnchors.length * 0.045, duration: 0.4 }}
              >
                <Link href="/resume" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-link-num">[cv]</span>Résumé
                </Link>
              </motion.div>
            </nav>
            <div className="mobile-menu-foot">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <div className="mobile-menu-socials">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

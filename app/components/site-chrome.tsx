"use client";

import type { ReactNode } from "react";
import { CatProvider } from "./cats";
import { PaletteProvider } from "./command-palette";
import { Cursor } from "./cursor";
import { Nav } from "./nav";
import { ScrollProgress } from "./scroll-progress";
import { ToastProvider } from "./toast";

/** Global client chrome: providers + nav + palette + cursor + toasts. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CatProvider>
        <PaletteProvider>
          <ScrollProgress />
          <Cursor />
          <Nav />
          {children}
        </PaletteProvider>
      </CatProvider>
    </ToastProvider>
  );
}

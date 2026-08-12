"use client";

import { createContext, useContext, useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";

const PaletteContext = createContext<{ open: () => void }>({ open: () => {} });

export function usePalette() {
  return useContext(PaletteContext);
}

export default function PaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {open ? <CommandPalette onClose={() => setOpen(false)} /> : null}
    </PaletteContext.Provider>
  );
}

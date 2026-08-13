"use client";

import { createContext, useContext, useEffect, useState } from "react";
import SnakeOverlay from "./SnakeOverlay";
import { useSound } from "./SoundProvider";

const SnakeContext = createContext<{ open: () => void }>({ open: () => {} });

export function useSnake() {
  return useContext(SnakeContext);
}

export default function SnakeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) play("open");
          return !o;
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  return (
    <SnakeContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {open ? <SnakeOverlay onClose={() => setOpen(false)} /> : null}
    </SnakeContext.Provider>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";

type Cmd = {
  label: string;
  hint: string;
  run: () => void;
};

export default function CommandPalette({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const nav = (href: string): Cmd => ({
      label: href === "/" ? "home" : href.slice(1),
      hint: `cd ${href}`,
      run: () => router.push(href),
    });
    return [
      nav("/"),
      nav("/work"),
      nav("/credentials"),
      nav("/about"),
      nav("/stack"),
      nav("/contact"),
      {
        label: "email",
        hint: "mailto",
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        label: "github",
        hint: site.github,
        run: () => {
          window.open(site.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        label: "linkedin",
        hint: site.linkedin,
        run: () => {
          window.open(site.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = (cmd: Cmd) => {
    onClose();
    cmd.run();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-md border border-line bg-surface"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="font-mono text-sm text-accent">$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
              if (e.key === "Enter" && filtered[active]) {
                run(filtered[active]);
              }
            }}
            placeholder="type a command…"
            className="w-full bg-transparent font-mono text-sm text-text placeholder:text-faint focus:outline-none"
          />
          <kbd className="rounded bg-surface-hi px-1.5 py-0.5 font-mono text-xs text-faint">
            esc
          </kbd>
        </div>
        <ul className="max-h-80 overflow-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-4 font-mono text-sm text-faint">
              command not found: {query || " "} — try `help`
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={`${cmd.label}:${i}`}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-left font-mono text-sm ${
                    i === active ? "bg-accent/15 text-text" : "text-muted"
                  }`}
                >
                  <span>{cmd.label}</span>
                  <span
                    className={`text-xs ${
                      i === active ? "text-accent" : "text-faint"
                    }`}
                  >
                    {cmd.hint}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="border-t border-line px-4 py-2 font-mono text-[11px] text-faint">
          ↑↓ navigate · ↵ run · esc close
        </div>
      </div>
    </div>
  );
}

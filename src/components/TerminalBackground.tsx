"use client";

import { useEffect, useState } from "react";
import { liveLines } from "@/data/commands";

const LOG_CAP = 12;
const CHAR_MS = 140;
const PAUSE_TICKS = 5;
let lineSeq = 0;

type Line = { id: number; text: string; chars: number };
type State = { lines: Line[]; pause: number };

function pickLine(): string {
  return liveLines[Math.floor(Math.random() * liveLines.length)];
}

function initState(): State {
  const seeded = liveLines.slice(0, 5).map((t) => ({
    id: lineSeq++,
    text: t,
    chars: t.length,
  }));
  const active = liveLines[5];
  return {
    lines: [
      ...seeded,
      { id: lineSeq++, text: active, chars: Math.min(4, active.length) },
    ],
    pause: 0,
  };
}

export default function TerminalBackground() {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setState((s) => {
        if (s.pause > 0) return { ...s, pause: s.pause - 1 };
        const last = s.lines[s.lines.length - 1];
        if (!last) return s;
        if (last.chars < last.text.length) {
          return {
            ...s,
            lines: [...s.lines.slice(0, -1), { ...last, chars: last.chars + 1 }],
          };
        }
        return {
          lines: [...s.lines, { id: lineSeq++, text: pickLine(), chars: 0 }].slice(
            -LOG_CAP,
          ),
          pause: PAUSE_TICKS,
        };
      });
    }, CHAR_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden opacity-[0.06] sm:opacity-[0.08] md:opacity-[0.14]"
    >
      <div className="absolute left-3 top-16 flex max-h-[70vh] max-w-[min(70vw,360px)] flex-col overflow-hidden lg:left-60">
        {state.lines.map((l, i) => {
          const isActive = i === state.lines.length - 1;
          return (
            <p
              key={l.id}
              className={`py-0.5 font-mono text-xs leading-relaxed ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              {l.text.slice(0, l.chars)}
              {isActive ? (
                <span className="ml-0.5 inline-block h-4 w-[0.6ch] translate-y-0.5 bg-accent cursor-blink" />
              ) : null}
            </p>
          );
        })}
      </div>
    </div>
  );
}

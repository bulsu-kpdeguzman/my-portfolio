"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import TerminalWindow from "./TerminalWindow";
import { useSound } from "./SoundProvider";

const SIZE = 17;
const BASE_TICK = 180;
const MIN_TICK = 90;
const BEST_KEY = "snake-highscore";

type Pt = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";
type Status = "idle" | "playing" | "over";
type Game = {
  snake: Pt[];
  dir: Dir;
  food: Pt;
  score: number;
  best: number;
  status: Status;
};

const DIRS: Record<Dir, Pt> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function keyToDir(e: KeyboardEvent): Dir | null {
  switch (e.key.toLowerCase()) {
    case "arrowup":
    case "w":
      return "up";
    case "arrowdown":
    case "s":
      return "down";
    case "arrowleft":
    case "a":
      return "left";
    case "arrowright":
    case "d":
      return "right";
    default:
      return null;
  }
}

function isReverse(a: Dir, b: Dir): boolean {
  return (
    (a === "up" && b === "down") ||
    (a === "down" && b === "up") ||
    (a === "left" && b === "right") ||
    (a === "right" && b === "left")
  );
}

function inSnake(p: Pt, snake: Pt[]): boolean {
  return snake.some((s) => s.x === p.x && s.y === p.y);
}

function placeFood(snake: Pt[]): Pt {
  for (;;) {
    const p = {
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    };
    if (!inSnake(p, snake)) return p;
  }
}

function readBest(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = Number(window.localStorage.getItem(BEST_KEY));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

function initGame(): Game {
  const cx = Math.floor(SIZE / 2);
  const cy = Math.floor(SIZE / 2);
  const snake = [
    { x: cx, y: cy },
    { x: cx, y: cy + 1 },
    { x: cx, y: cy + 2 },
  ];
  return {
    snake,
    dir: "up",
    food: placeFood(snake),
    score: 0,
    best: readBest(),
    status: "idle",
  };
}

function DPadButton({
  dir,
  label,
  onTurn,
}: {
  dir: Dir;
  label: string;
  onTurn: (d: Dir) => void;
}) {
  return (
    <button
      onClick={() => onTurn(dir)}
      aria-label={`Move ${dir}`}
      className="rounded border border-line bg-bg px-3 py-2 font-mono text-sm text-muted transition-colors hover:text-text active:bg-surface-hi"
    >
      {label}
    </button>
  );
}

export default function SnakeOverlay({
  onClose,
}: {
  onClose: () => void;
}) {
  const [game, setGame] = useState<Game>(initGame);
  const { play } = useSound();

  const tickMs = Math.max(MIN_TICK, BASE_TICK - game.score * 5);

  const turn = useCallback(
    (next: Dir) => {
      setGame((g) => {
        if (g.status !== "playing") {
          play("open");
          if (g.status === "over") {
            return { ...initGame(), dir: next, status: "playing", best: g.best };
          }
          return { ...g, dir: next, status: "playing" };
        }
        if (isReverse(g.dir, next)) return g;
        return { ...g, dir: next };
      });
    },
    [play],
  );

  useEffect(() => {
    if (game.status !== "playing") return;
    const id = setInterval(() => {
      setGame((g) => {
        if (g.status !== "playing") return g;
        const d = DIRS[g.dir];
        const head = { x: g.snake[0].x + d.x, y: g.snake[0].y + d.y };
        const hitWall =
          head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE;
        const hitSelf = inSnake(head, g.snake);
        if (hitWall || hitSelf) {
          play("theme");
          return { ...g, status: "over" };
        }
        const ate = head.x === g.food.x && head.y === g.food.y;
        const snake = ate ? [head, ...g.snake] : [head, ...g.snake.slice(0, -1)];
        if (ate) {
          play("success");
          const score = g.score + 1;
          return {
            ...g,
            snake,
            score,
            best: Math.max(g.best, score),
            food: placeFood(snake),
          };
        }
        return { ...g, snake };
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [game.status, tickMs, play]);

  useEffect(() => {
    try {
      window.localStorage.setItem(BEST_KEY, String(game.best));
    } catch {
      /* storage unavailable */
    }
  }, [game.best]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const next = keyToDir(e);
      if (!next) return;
      e.preventDefault();
      turn(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, turn]);

  const cells = useMemo(() => {
    const map = new Map<string, "head" | "body" | "food">();
    game.snake.forEach((p, i) =>
      map.set(`${p.x},${p.y}`, i === 0 ? "head" : "body"),
    );
    map.set(`${game.food.x},${game.food.y}`, "food");
    return map;
  }, [game]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-overlay px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="m-auto w-full max-w-lg py-10" onClick={(e) => e.stopPropagation()}>
        <TerminalWindow title="~/play/snake">
          <p className="font-mono text-xs text-faint">$ ./snake --arcade</p>

          <div className="mt-3 flex items-center justify-between font-mono text-xs">
            <span className="text-muted">
              score:{" "}
              <span className="text-text">
                {String(game.score).padStart(2, "0")}
              </span>
            </span>
            <span className="text-muted">
              best:{" "}
              <span className="text-accent">
                {String(game.best).padStart(2, "0")}
              </span>
            </span>
          </div>

          <div
            role="img"
            aria-label="Snake game grid"
            className="mt-3 w-[400px] max-w-full overflow-hidden rounded-sm border border-line bg-line p-px"
          >
            <div className="grid w-full grid-cols-[repeat(17,1fr)] gap-px">
              {Array.from({ length: SIZE * SIZE }, (_, i) => {
                const x = i % SIZE;
                const y = Math.floor(i / SIZE);
                const kind = cells.get(`${x},${y}`);
                const cls =
                  kind === "head"
                    ? "bg-ok"
                    : kind === "body"
                      ? "bg-ok/60"
                      : kind === "food"
                        ? "bg-danger"
                        : "bg-bg";
                return (
                  <div key={i} className={`aspect-square ${cls}`} />
                );
              })}
            </div>
          </div>

          <p className="mt-3 font-mono text-xs text-faint">
            {game.status === "idle"
              ? "press ↑ ↓ ← → or WASD to start"
              : game.status === "over"
                ? `game over — score ${game.score} · press any arrow to retry`
                : "eat the red blocks · avoid walls and yourself"}
          </p>

          <div className="mx-auto mt-4 grid w-fit grid-cols-3 gap-1.5 lg:hidden">
            <span />
            <DPadButton dir="up" label="↑" onTurn={turn} />
            <span />
            <DPadButton dir="left" label="←" onTurn={turn} />
            <DPadButton dir="down" label="↓" onTurn={turn} />
            <DPadButton dir="right" label="→" onTurn={turn} />
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type SoundKind = "tick" | "click" | "open" | "enter" | "success" | "theme";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  play: (kind: SoundKind, force?: boolean) => void;
};

const STORAGE_KEY = "sound";
const DATA_NO_SOUND = "data-no-click-sound";
const DATA_NO_HOVER = "data-no-hover-sound";

let ctx: AudioContext | null = null;
let unlocked = false;

function createCtx(): AudioContext | null {
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    return new Ctor();
  } catch {
    return null;
  }
}

function getCtx(): AudioContext | null {
  if (!unlocked) return null;
  try {
    if (!ctx) {
      ctx = createCtx();
      if (!ctx) return null;
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function unlock() {
  if (unlocked) return;
  unlocked = true;
  const ac = createCtx();
  if (ac && ac.state === "suspended") void ac.resume();
}

function blip(
  ac: AudioContext,
  opts: { freq: number; dur: number; gain: number; type?: OscillatorType },
) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  const t = ac.currentTime;
  osc.type = opts.type ?? "triangle";
  osc.frequency.setValueAtTime(opts.freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + opts.dur + 0.02);
}

const SOUNDS: Record<SoundKind, () => void> = {
  tick: () => {
    const ac = getCtx();
    if (ac) blip(ac, { freq: 1500, dur: 0.035, gain: 0.03, type: "sine" });
  },
  click: () => {
    const ac = getCtx();
    if (ac) blip(ac, { freq: 420, dur: 0.06, gain: 0.045 });
  },
  open: () => {
    const ac = getCtx();
    if (ac) blip(ac, { freq: 660, dur: 0.05, gain: 0.035 });
  },
  enter: () => {
    const ac = getCtx();
    if (ac) blip(ac, { freq: 880, dur: 0.06, gain: 0.04 });
  },
  success: () => {
    const ac = getCtx();
    if (!ac) return;
    blip(ac, { freq: 523, dur: 0.08, gain: 0.04 });
    setTimeout(() => {
      const a = getCtx();
      if (a) blip(a, { freq: 784, dur: 0.1, gain: 0.04 });
    }, 90);
  },
  theme: () => {
    const ac = getCtx();
    if (ac) blip(ac, { freq: 520, dur: 0.08, gain: 0.04 });
  },
};

function readStoredEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(readStoredEnabled);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      /* storage unavailable */
    }
  }, [enabled]);

  useEffect(() => {
    const unlockOnGesture = () => unlock();
    const opts: AddEventListenerOptions = { once: true, capture: true };
    window.addEventListener("pointerdown", unlockOnGesture, opts);
    window.addEventListener("keydown", unlockOnGesture, opts);
    window.addEventListener("touchstart", unlockOnGesture, opts);
    return () => {
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
      window.removeEventListener("touchstart", unlockOnGesture);
    };
  }, []);

  useEffect(() => {
    let lastHovered: Element | null = null;
    let lastTickAt = 0;
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !enabledRef.current) return;
      const interactive = target.closest("a, button, [role='button']");
      if (!interactive) {
        lastHovered = null;
        return;
      }
      if (interactive === lastHovered) return;
      lastHovered = interactive;
      const now = performance.now();
      if (now - lastTickAt < 110) return;
      lastTickAt = now;
      if (interactive.hasAttribute(DATA_NO_HOVER)) return;
      SOUNDS.tick();
    };
    window.addEventListener("mouseover", onMouseOver, true);
    return () => window.removeEventListener("mouseover", onMouseOver, true);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !enabledRef.current) return;
      const interactive = target.closest("a, button, [role='button']");
      if (!interactive) return;
      if (interactive.hasAttribute(DATA_NO_SOUND)) return;
      SOUNDS.click();
    };
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

  const value = useMemo<SoundContextValue>(
    () => ({
      enabled,
      setEnabled,
      play: (kind, force = false) => {
        if (!force && !enabledRef.current) return;
        SOUNDS[kind]();
      },
    }),
    [enabled],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

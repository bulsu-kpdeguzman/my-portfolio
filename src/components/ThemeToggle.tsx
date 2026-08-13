"use client";

import { useTheme, type ThemeMode } from "./ThemeProvider";
import { useSound } from "./SoundProvider";

const ICON_CLS = "h-3.5 w-3.5";

const SystemIcon = (
  <svg viewBox="0 0 24 24" fill="none" className={ICON_CLS} aria-hidden="true">
    <rect
      x="3"
      y="4"
      width="18"
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M9 21h6M12 17v4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const LightIcon = (
  <svg viewBox="0 0 24 24" fill="none" className={ICON_CLS} aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const DarkIcon = (
  <svg viewBox="0 0 24 24" fill="none" className={ICON_CLS} aria-hidden="true">
    <path
      d="M20 13.6A8 8 0 1 1 10.4 4a6.2 6.2 0 0 0 9.6 9.6z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const SoundOnIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      d="M5 10v4h3l4 3V7L8 10H5zM16 9a4 4 0 010 6M18.5 6.5a7.5 7.5 0 010 11"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SoundOffIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      d="M5 10v4h3l4 3V7L8 10H5zM16 10l5 5M21 10l-5 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OPTIONS: { value: ThemeMode; title: string; icon: React.ReactNode }[] = [
  { value: "system", title: "System theme", icon: SystemIcon },
  { value: "light", title: "Light theme", icon: LightIcon },
  { value: "dark", title: "Dark theme", icon: DarkIcon },
];

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const { enabled, setEnabled, play } = useSound();

  const selectTheme = (m: ThemeMode) => {
    setMode(m);
    play("theme");
  };

  const toggleSound = () => {
    setEnabled(!enabled);
    play("theme", true);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        role="group"
        aria-label="Theme"
        className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5"
      >
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => selectTheme(o.value)}
            data-no-click-sound
            suppressHydrationWarning
            aria-pressed={mode === o.value}
            aria-label={o.title}
            title={o.title}
            className={`grid h-6 w-6 place-items-center rounded-full transition-colors ${
              mode === o.value
                ? "bg-surface-hi text-text"
                : "text-faint hover:text-text"
            }`}
          >
            {o.icon}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleSound}
        data-no-click-sound
        suppressHydrationWarning
        aria-pressed={enabled}
        aria-label="Toggle interface sounds"
        title={enabled ? "sound on" : "sound off"}
        className="grid h-[26px] w-[26px] place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-text"
      >
        {enabled ? SoundOnIcon : SoundOffIcon}
      </button>
    </div>
  );
}

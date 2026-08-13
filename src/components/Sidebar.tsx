"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { usePalette } from "./PaletteProvider";
import { useSnake } from "./SnakeProvider";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/work", label: "work" },
  { href: "/ongoing", label: "ongoing" },
  { href: "/credentials", label: "credentials" },
  { href: "/about", label: "about" },
  { href: "/stack", label: "stack" },
  { href: "/contact", label: "contact" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { open } = usePalette();
  const { open: openSnake } = useSnake();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-68 flex-col border-r border-line bg-bg lg:flex">
      <div className="px-5 py-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-mono text-sm font-medium text-text transition-colors hover:text-accent"
          >
            ~/{site.handle}
          </Link>
          <button
            onClick={open}
            data-no-click-sound
            className="shrink-0 rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-muted transition-colors hover:text-text"
            aria-label="Open command palette"
          >
            ⌘K
          </button>
        </div>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-faint">
          {site.role}
        </p>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto px-3 pb-4">
        <p className="px-1 pb-1 font-mono text-[11px] text-faint">directory</p>
        <nav className="space-y-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center border-l-2 py-1.5 pl-3 pr-2 font-mono text-sm transition-colors ${
                isActive(l.href)
                  ? "border-accent bg-accent/10 text-text"
                  : "border-transparent text-muted hover:bg-surface hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="mt-6 px-1 pb-1 font-mono text-[11px] text-faint">links</p>
        <div className="space-y-0.5">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border-l-2 border-transparent py-1.5 pl-3 pr-2 font-mono text-sm text-muted transition-colors hover:bg-surface hover:text-text"
          >
            github
            <span className="text-xs text-faint">↗</span>
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border-l-2 border-transparent py-1.5 pl-3 pr-2 font-mono text-sm text-muted transition-colors hover:bg-surface hover:text-text"
          >
            linkedin
            <span className="text-xs text-faint">↗</span>
          </a>
          <button
            onClick={openSnake}
            className="flex w-full items-center justify-between border-l-2 border-transparent py-1.5 pl-3 pr-2 font-mono text-sm text-muted transition-colors hover:bg-surface hover:text-text"
          >
            snake
            <kbd className="rounded border border-line bg-surface px-1 py-0.5 font-mono text-[10px] leading-none text-faint">
              ⌘J
            </kbd>
          </button>
        </div>
      </div>

      <div className="px-5 py-3">
        <ThemeToggle />
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
          For work, collabs &amp; everything else, reach me at
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-1.5 flex items-center gap-2 font-mono text-[11px] text-text transition-colors hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M4 7l8 6 8-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="break-all">{site.email}</span>
        </a>
      </div>
    </aside>
  );
}

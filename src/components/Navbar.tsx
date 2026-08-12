"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { usePalette } from "./PaletteProvider";

const links = [
  { href: "/work", label: "work" },
  { href: "/credentials", label: "credentials" },
  { href: "/about", label: "about" },
  { href: "/stack", label: "stack" },
  { href: "/contact", label: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { open } = usePalette();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm text-text hover:text-accent"
        >
          ~/{site.handle}
        </Link>

        <nav className="flex flex-wrap items-center gap-x-1 gap-y-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1 rounded px-1.5 py-1 font-mono text-xs transition-colors sm:px-2 sm:text-sm ${
                isActive(l.href)
                  ? "text-text"
                  : "text-muted hover:bg-surface hover:text-text"
              }`}
            >
              {isActive(l.href) && (
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              )}
              {l.label}
            </Link>
          ))}
          <button
            onClick={open}
            className="ml-1 hidden items-center gap-1 rounded border border-line bg-surface px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-text sm:flex"
            aria-label="Open command palette"
          >
            ⌘K
            <span className="text-faint">palette</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

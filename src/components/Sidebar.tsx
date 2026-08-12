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

export default function Sidebar() {
  const pathname = usePathname();
  const { open } = usePalette();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-line bg-bg lg:flex">
      <div className="flex flex-col gap-1 px-5 py-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium text-text transition-colors hover:text-accent"
        >
          ~/{site.handle}
        </Link>
        <p className="font-mono text-[11px] text-faint">{site.role}</p>
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
          <a
            href={`mailto:${site.email}`}
            className="flex items-center border-l-2 border-transparent py-1.5 pl-3 pr-2 font-mono text-sm text-muted transition-colors hover:bg-surface hover:text-text"
          >
            email
          </a>
        </div>
      </div>

      <button
        onClick={open}
        className="flex items-center gap-1.5 border-t border-line px-5 py-3 font-mono text-xs text-muted transition-colors hover:text-text"
      >
        ⌘K
        <span className="text-faint">palette</span>
      </button>
    </aside>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The requested portfolio page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="mb-2 font-mono text-sm text-accent">$ ls -la</p>
      <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        404 — Route not found
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        The path you requested does not exist in this portfolio.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
        <Link
          href="/"
          className="rounded bg-accent px-4 py-2 text-white transition-opacity hover:opacity-90"
        >
          cd ~
        </Link>
        <Link
          href="/work"
          className="rounded border border-line px-4 py-2 text-text transition-colors hover:border-accent hover:text-accent"
        >
          cd ~/work
        </Link>
        <Link
          href="/contact"
          className="rounded border border-line px-4 py-2 text-text transition-colors hover:border-accent hover:text-accent"
        >
          contact
        </Link>
      </div>
    </div>
  );
}

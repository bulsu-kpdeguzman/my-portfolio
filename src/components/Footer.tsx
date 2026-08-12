import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {site.name} · built with Next.js
        </p>
        <div className="flex items-center gap-4 font-mono text-xs text-muted">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            github
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            linkedin
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            email
          </a>
        </div>
      </div>
    </footer>
  );
}

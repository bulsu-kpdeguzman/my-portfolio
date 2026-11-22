import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";
import { site } from "@/data/site";
import { ongoing } from "@/data/ongoing";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Current Work",
  description:
    "See what Kenjie P. De Guzman is currently building, including a centralized Retrieval-Augmented Generation chatbot for BJMP offices.",
  path: "/ongoing",
  keywords: ["BJMP RAG chatbot", "Retrieval-Augmented Generation"],
});

const statusClass: Record<string, string> = {
  "in progress": "border-warn text-warn",
  participating: "border-ok text-ok",
};

export default function OngoingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/ongoing"
        title="Current software and AI work"
        description="What I'm building and competing in right now — updated whenever something changes."
      />

      <div className="space-y-8">
        {ongoing.map((item) => (
          <TerminalWindow
            key={item.id}
            title={`${site.handle}@portfolio: ~/ongoing/${item.type}`}
          >
            <div className="space-y-2">
              <p className="font-mono text-xs text-faint">
                $ cat ongoing.txt --{item.type}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-lg font-medium text-text">
                  {item.title}
                </h2>
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${statusClass[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="max-w-xl leading-relaxed text-muted">
                {item.tagline}
              </p>
              <ul className="space-y-3 pt-2">
                {item.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span className="font-mono text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TerminalWindow>
        ))}
      </div>
    </div>
  );
}

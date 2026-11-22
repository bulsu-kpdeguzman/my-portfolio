import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { certs } from "@/data/certs";
import { achievements } from "@/data/achievements";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Certifications & Achievements",
  description:
    "View Kenjie P. De Guzman's Java and Google AI certifications plus placements in GCash ImaGnation, the eGovPH Hackathon, and the IRCITE IT Marketing Challenge.",
  path: "/credentials",
  keywords: [
    "IT Specialist Java",
    "Google AI Professional Certificate",
    "GCash ImaGnation",
    "eGovPH Hackathon",
  ],
});

const placementAccent = (placement: string): string => {
  const p = placement.toLowerCase();
  if (/win|champion|best/.test(p)) return "ok";
  if (/finalist|top/.test(p)) return "accent";
  return "muted";
};

const chipClass = (placement: string): string => {
  const accent = placementAccent(placement);
  if (accent === "ok") return "border-ok text-ok";
  if (accent === "accent") return "border-accent text-accent";
  return "border-line text-muted";
};

export default function CredentialsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/credentials"
        title="Certifications and achievements"
        description="Verifiable evidence of skill — credentials I've earned and competition honors, each row linking to the record."
      />

      <div className="space-y-8">
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line bg-surface-hi px-4 py-2 font-mono text-xs text-faint">
            <span className="text-ok">✓</span>
            cat credentials.lock && openssl verify --all
          </div>

          <div className="border-t border-line">
            {certs.map((c, i) => (
              <div
                key={c.id}
                className="group flex items-start justify-between gap-4 border-b border-line px-4 py-4 transition-colors hover:bg-surface-hi last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-base font-medium text-text transition-colors group-hover:text-accent">
                      {c.name}
                    </span>
                  </div>
                  {c.issuer ? (
                    <p className="mt-1 font-mono text-sm text-muted">
                      {c.issuer}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-4 pt-1 font-mono text-xs">
                  {c.year ? (
                    <span className="text-faint">{c.year}</span>
                  ) : null}
                  {c.url ? (
                    <Link
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-line px-2 py-1 text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      verify ↗
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line px-4 py-2 font-mono text-xs text-faint">
            status: {certs.length} credentials · verification links shown where available
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line bg-surface-hi px-4 py-2 font-mono text-xs text-faint">
            <span className="text-ok">✓</span>
            cat highlights.log --honors
          </div>

          <div className="border-t border-line">
            {achievements.map((a, i) => (
              <div
                key={a.id}
                className="group flex items-start justify-between gap-4 border-b border-line px-4 py-4 transition-colors hover:bg-surface-hi last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-base font-medium text-text transition-colors group-hover:text-accent">
                      {a.name}
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${chipClass(
                        a.placement,
                      )}`}
                    >
                      {a.placement}
                    </span>
                    {a.recent ? (
                      <span className="rounded border border-accent px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                        recent
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 font-mono text-sm text-muted">
                    {a.organizer}
                    {a.year ? <span className="text-faint"> · {a.year}</span> : null}
                  </p>
                  {a.note ? (
                    <p className="mt-1 font-mono text-sm text-muted">
                      {a.note}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-4 pt-1 font-mono text-xs">
                  {a.url ? (
                    <Link
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-line px-2 py-1 text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      verify ↗
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line px-4 py-2 font-mono text-xs text-faint">
            status: {achievements.length} honors · public verification links shown where available
          </div>
        </div>
      </div>
    </div>
  );
}

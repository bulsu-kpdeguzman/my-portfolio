import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Kenjie P. De Guzman for internships, freelance full-stack development, AI applications, backend systems, and junior software roles.",
  path: "/contact",
  keywords: ["hire full-stack developer", "Pampanga software developer"],
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/contact"
        title="Contact Kenjie P. De Guzman"
        description="Open to internships, freelance work and junior full-stack roles."
      />

      <div className="rounded-md border border-line bg-surface px-6 py-8">
        <h2 className="font-mono text-2xl text-text">
          $ echo &quot;let&apos;s talk&quot;
        </h2>
        <p className="mt-3 text-muted">
          Tell me what you&apos;re building and what it needs to move for the
          business. I&apos;ll tell you how I&apos;d design the system behind it.
        </p>
        <p className="mt-3 font-mono text-xs text-faint">
          resume: available on request
        </p>
        <div className="mt-6">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-base text-accent hover:underline"
          >
            {site.email}
          </a>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            github ↗
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            linkedin ↗
          </a>
          <span className="text-faint">{site.location}</span>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-mono text-sm text-accent">
          $ write message && send
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}

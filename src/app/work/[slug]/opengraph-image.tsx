import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

export const alt = `${site.fullName} — Project Case Study`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.name ?? "Software Project";
  const category = project ? `#${project.category} · ${project.year}` : "Case Study";
  const tagline =
    project?.tagline ?? `${site.fullName} — Full-Stack Developer`;
  const stackLine = project ? project.stack.slice(0, 5).join(" · ") : site.role;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#f4f4f5",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#4f8cff",
          }}
        >
          <span>$ cat ~/projects/{slug}/README.md</span>
          <span style={{ color: "#a1a1aa" }}>{category}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ display: "flex", color: "#a1a1aa", fontSize: 30 }}>
            {tagline}
          </div>
          <div style={{ display: "flex", color: "#4f8cff", fontSize: 22 }}>
            {stackLine}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 22,
          }}
        >
          <span>{site.fullName}</span>
          <span>kenjie.is-a.dev/work/{slug}</span>
        </div>
      </div>
    ),
    size,
  );
}

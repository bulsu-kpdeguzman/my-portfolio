import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamic = "force-static";

export function GET() {
  const projectList = projects
    .map(
      (project) =>
        `- [${project.name}](${site.url}/work/${project.slug}): ${project.tagline}`,
    )
    .join("\n");

  const content = `# ${site.fullName}

> ${site.description}

${site.fullName} is a BSIT student at ${site.university}, graduating ${site.graduation}, and a full-stack developer focused on backend architecture, business logic, AI applications, and practical user workflows.

## Primary pages

- [About](${site.url}/about): Education, leadership, experience, and working principles.
- [Projects](${site.url}/work): Detailed project case studies, roles, architecture, and results.
- [Credentials](${site.url}/credentials): Certifications and competition achievements.
- [Technology stack](${site.url}/stack): Languages, frameworks, data tools, AI, and infrastructure experience.
- [Contact](${site.url}/contact): Professional contact information and availability.

## Projects

${projectList}

## Identity

- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Location: ${site.location}
- Email: ${site.email}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

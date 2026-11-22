import ProjectList from "@/components/ProjectList";
import SectionHeader from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Software Projects",
  description:
    "Explore Kenjie P. De Guzman's full-stack, AI, government technology, campus, and web application projects with detailed roles, architecture, and outcomes.",
  path: "/work",
  keywords: ["software projects", "AI projects", "govtech projects"],
});

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/projects"
        title="Software projects"
        description="Capstone, hackathon and competition builds. Filter by category, click any row for the full write-up."
      />
      <ProjectList />
    </div>
  );
}

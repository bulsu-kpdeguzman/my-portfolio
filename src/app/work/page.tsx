import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Projects",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/projects"
        description="Capstone, hackathon and competition builds. Filter by category, click any row for the full write-up."
      />
      <ProjectList />
    </div>
  );
}

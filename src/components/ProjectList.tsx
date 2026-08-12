"use client";

import { useState } from "react";
import { categories, projects } from "@/data/projects";
import ProjectRow from "./ProjectRow";

export default function ProjectList() {
  const [cat, setCat] = useState("All");

  const visible =
    cat === "All" ? projects : projects.filter((p) => p.category === cat);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded px-3 py-1 font-mono text-sm transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "bg-surface text-muted ring-1 ring-inset ring-line hover:text-text"
              }`}
            >
              {c.toLowerCase()}
            </button>
          );
        })}
      </div>
      <div className="border-t border-line">
        {visible.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-faint">
        {visible.length} entr{visible.length === 1 ? "y" : "ies"} · $
        {visible.map((p) => ` ./${p.slug}`).join("")}
      </p>
    </div>
  );
}

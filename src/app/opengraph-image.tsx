import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.fullName} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ display: "flex", color: "#4f8cff", fontSize: 28 }}>
          $ whoami
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 700 }}>
            {site.fullName}
          </div>
          <div style={{ display: "flex", color: "#a1a1aa", fontSize: 32 }}>
            Full-Stack Developer · Systems Architect · AI Applications
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 23,
          }}
        >
          <span>{site.location}</span>
          <span>kenjie.is-a.dev</span>
        </div>
      </div>
    ),
    size,
  );
}

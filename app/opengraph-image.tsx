import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Typographic share card that matches the site's restrained hero.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#010103",
          color: "#E4E4E6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#AFB0B6" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#22c55e" }} />
          {site.role} · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#AFB0B6" }}>{site.tagline}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #1C1C21",
            paddingTop: 28,
            fontSize: 24,
            color: "#62646C",
          }}
        >
          <div style={{ display: "flex" }}>{site.skills.slice(0, 4).join("  /  ")}</div>
          <div style={{ display: "flex" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}

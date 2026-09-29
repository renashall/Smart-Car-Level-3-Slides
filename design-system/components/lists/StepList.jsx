import React from "react";

/**
 * Step list — numbered 1·2·3 steps with navy circle markers. Items can be
 * plain strings or { title, body } for a bold lead + supporting line.
 */
export function StepList({ items = [], start = 1, size = "md", style = {}, ...rest }) {
  const fs = size === "lg" ? "var(--text-lg)" : size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const dim = size === "lg" ? 36 : size === "sm" ? 26 : 30;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {items.map((it, i) => {
        const title = typeof it === "string" ? it : it.title;
        const body = typeof it === "string" ? null : it.body;
        return (
          <div key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
            <span style={{
              flexShrink: 0,
              width: dim, height: dim,
              borderRadius: "var(--radius-circle)",
              background: "var(--navy-600)",
              color: "var(--neutral-0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: dim * 0.46,
            }}>{start + i}</span>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: fs, color: "var(--text-strong)", fontWeight: body ? 700 : 500, lineHeight: 1.4 }}>{title}</div>
              {body && (
                <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.45, marginTop: 2 }}>{body}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

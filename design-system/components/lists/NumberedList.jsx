import React from "react";

/**
 * Numbered checklist — green numbered markers (CheckList + StepList combined).
 * Items can be plain strings or { title, body }.
 */
export function NumberedList({ items = [], start = 1, size = "md", style = {}, ...rest }) {
  const fs = size === "lg" ? "var(--text-lg)" : size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const dim = size === "lg" ? 36 : size === "sm" ? 26 : 32;
  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {items.map((it, i) => {
        const title = typeof it === "string" ? it : it.title;
        const body = typeof it === "string" ? null : it.body;
        return (
          <div key={i} style={{
            display: "flex", gap: "var(--space-3)", alignItems: "flex-start",
            padding: "13px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
          }}>
            <span style={{
              flexShrink: 0, width: dim, height: dim,
              borderRadius: "var(--radius-circle)",
              background: "var(--green-100)",
              color: "var(--green-700)",
              border: "1.5px solid var(--green-400)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: dim * 0.44,
            }}>{start + i}</span>
            <div style={{ paddingTop: 3 }}>
              <div style={{ fontSize: fs, color: "var(--text-strong)", fontWeight: body ? 700 : 500, lineHeight: 1.35 }}>{title}</div>
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

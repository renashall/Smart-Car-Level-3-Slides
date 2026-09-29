import React from "react";

/**
 * Checklist — vertical list of items each marked with a green tick.
 * Items can be plain strings (all ticked) or { text, checked }.
 */
export function CheckList({ items = [], size = "md", style = {}, ...rest }) {
  const fs = size === "lg" ? "var(--text-lg)" : size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const dim = size === "lg" ? 30 : size === "sm" ? 22 : 26;
  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {items.map((it, i) => {
        const text = typeof it === "string" ? it : it.text;
        const checked = typeof it === "string" ? true : it.checked !== false;
        return (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "12px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
            fontSize: fs,
            color: "var(--text-strong)",
            fontWeight: 500,
          }}>
            <span style={{
              flexShrink: 0,
              width: dim, height: dim,
              borderRadius: "var(--radius-circle)",
              background: checked ? "var(--status-success-bg)" : "var(--neutral-100)",
              color: checked ? "var(--status-success)" : "var(--neutral-400)",
              border: checked ? "none" : "1px solid var(--border-default)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: dim * 0.5,
            }}>{checked ? "✓" : ""}</span>
            <span style={{ color: checked ? "var(--text-strong)" : "var(--text-muted)" }}>{text}</span>
          </div>
        );
      })}
    </div>
  );
}

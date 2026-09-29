import React from "react";

/**
 * Icon list — rows of an icon (image) with a bold title and a description line.
 * The "common issues / features" list pattern.
 */
export function IconList({ items = [], iconSize = 34, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: "flex", gap: "var(--space-4)", alignItems: "flex-start",
          padding: "15px 0",
          borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
        }}>
          {it.icon && (
            <img src={it.icon} alt="" style={{ width: iconSize, height: iconSize, flexShrink: 0, objectFit: "contain" }} />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--text-strong)", margin: "0 0 3px" }}>{it.title}</div>
            {it.text && (
              <div style={{ fontSize: "var(--text-base)", color: "var(--text-muted)", lineHeight: 1.45 }}>{it.text}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import React from "react";

/**
 * Mini checklist — a compact list of ✓ items. The coach "every class" reminder
 * pattern. `onDark` (default) styles white text for a navy card.
 */
export function MiniChecklist({ items = [], onDark = true, divided = true, style = {}, ...rest }) {
  const color = onDark ? "#fff" : "var(--text-strong)";
  const line = onDark ? "rgba(255,255,255,.15)" : "var(--border-subtle)";
  const tick = onDark ? "var(--teal-300)" : "var(--status-success)";
  return (
    <div style={{ fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: "flex", gap: 8, alignItems: "flex-start",
          fontSize: "var(--text-sm)", fontWeight: 600, color, lineHeight: 1.4,
          padding: "8px 0",
          borderTop: i === 0 || !divided ? "none" : `1px solid ${line}`,
        }}>
          <span style={{ color: tick, fontWeight: 800 }}>✓</span>
          <span>{it}</span>
        </div>
      ))}
    </div>
  );
}

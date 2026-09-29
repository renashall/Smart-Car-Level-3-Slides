import React from "react";

/**
 * Tier list — rows of a small tag (count) and a bold label. The certificate
 * tiers pattern (High Honors / Honors / Regular). Styled for a dark card.
 */
export function TierList({ items = [], style = {}, ...rest }) {
  return (
    <div style={{ fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "var(--text-base)", padding: "7px 0" }}>
          <span style={{
            minWidth: 22, textAlign: "center",
            background: "var(--amber-400)", color: "#fff",
            fontWeight: 800, borderRadius: 6, padding: "1px 6px", fontSize: "var(--text-xs)",
          }}>{it.tag}</span>
          <b style={{ color: "#fff", fontWeight: 700 }}>{it.label}</b>
        </div>
      ))}
    </div>
  );
}

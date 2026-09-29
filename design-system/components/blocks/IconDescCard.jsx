import React from "react";

/**
 * Icon-and-description box — a circular symbol badge over a title and a short
 * description. The thank-you slide "ways to reach me" / step-box pattern.
 * `glass` styles it for a dark (navy) slide; otherwise it's a white card.
 */
export function IconDescCard({ symbol, title, text, glass = false, style = {}, ...rest }) {
  const surface = glass
    ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }
    : { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" };
  const titleColor = glass ? "#fff" : "var(--text-strong)";
  const textColor = glass ? "var(--teal-100)" : "var(--text-muted)";
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        padding: "22px 24px",
        fontFamily: "var(--font-sans)",
        ...surface,
        ...style,
      }}
      {...rest}
    >
      <div style={{
        width: 38, height: 38, borderRadius: "var(--radius-circle)",
        background: "var(--teal-300)", color: "var(--navy-900)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 19, fontWeight: 800, marginBottom: 14,
      }}>{symbol}</div>
      <div style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: titleColor, margin: "0 0 5px" }}>{title}</div>
      <div style={{ fontSize: "var(--text-sm)", color: textColor, lineHeight: 1.45 }}>{text}</div>
    </div>
  );
}

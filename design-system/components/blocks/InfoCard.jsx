import React from "react";

/**
 * Info card — a filled navy panel with an optional badge or eyebrow, a title,
 * and body text. Used for "Questions?" and "Up next" style call-out cards.
 */
export function InfoCard({ eyebrow, badge, title, children, style = {}, ...rest }) {
  return (
    <div
      style={{
        background: "var(--navy-600)",
        borderRadius: "var(--radius-xl)",
        padding: "34px",
        color: "#fff",
        boxShadow: "var(--shadow-lg)",
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {badge != null && (
        <div style={{
          width: 56, height: 56, borderRadius: "var(--radius-circle)",
          background: "var(--teal-300)", color: "var(--navy-900)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, fontWeight: 800, marginBottom: 20,
        }}>{badge}</div>
      )}
      {eyebrow && (
        <div style={{
          fontSize: "var(--text-sm)", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps)", color: "var(--teal-300)", marginBottom: 12,
        }}>{eyebrow}</div>
      )}
      <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>{title}</div>
      <div style={{ fontSize: "var(--text-md)", color: "var(--teal-100)", lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

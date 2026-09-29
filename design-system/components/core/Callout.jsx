import React from "react";

const KINDS = {
  note:    { bg: "var(--navy-50)",  bar: "var(--navy-600)",  fg: "var(--navy-700)",  label: "Note" },
  tip:     { bg: "var(--green-100)", bar: "var(--green-400)", fg: "var(--green-700)", label: "Tip" },
  warning: { bg: "var(--amber-50)", bar: "var(--amber-400)", fg: "var(--amber-800)", label: "Heads up" },
  dont:    { bg: "var(--status-error-bg)", bar: "var(--status-error)", fg: "var(--status-error)", label: "Don't" },
};

/**
 * Teaching call-out box — tips, notes and warnings inside lessons & slides.
 */
export function Callout({ kind = "note", title, icon = null, children, style = {}, ...rest }) {
  const k = KINDS[kind] || KINDS.note;
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-3)",
        background: k.bg,
        borderLeft: `4px solid ${k.bar}`,
        borderRadius: "var(--radius-md)",
        padding: "var(--space-4) var(--space-5)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {icon && <div style={{ flexShrink: 0, width: 26, height: 26 }}>{icon}</div>}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: "var(--text-xs)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps)",
          color: k.fg,
          marginBottom: "4px",
        }}>
          {title || k.label}
        </div>
        <div style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

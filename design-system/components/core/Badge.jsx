import React from "react";

const TONES = {
  navy:    { bg: "var(--navy-100)",   fg: "var(--navy-700)" },
  teal:    { bg: "var(--teal-100)",   fg: "var(--teal-700)" },
  amber:   { bg: "var(--amber-100)",  fg: "var(--amber-800)" },
  neutral: { bg: "var(--neutral-100)",fg: "var(--neutral-700)" },
  success: { bg: "var(--status-success-bg)", fg: "var(--status-success)" },
  warning: { bg: "var(--status-warning-bg)", fg: "var(--amber-800)" },
  error:   { bg: "var(--status-error-bg)",   fg: "var(--status-error)" },
  solid:   { bg: "var(--navy-600)",   fg: "var(--neutral-0)" },
};

/**
 * Small pill label for status, categories and lesson tags.
 */
export function Badge({ tone = "neutral", children, icon = null, style = {}, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "3px 10px",
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0.01em",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}

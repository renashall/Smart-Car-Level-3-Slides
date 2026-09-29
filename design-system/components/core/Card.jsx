import React from "react";

const PADS = { sm: "var(--space-4)", md: "var(--space-5)", lg: "var(--space-6)" };

/**
 * Surface container — the workhorse panel for lessons, materials and slide blocks.
 */
export function Card({
  padding = "md",
  elevation = "sm",
  interactive = false,
  accent = null,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const shadowMap = {
    none: "none",
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
  };
  const accentColor = accent
    ? { navy: "var(--navy-600)", teal: "var(--teal-300)", amber: "var(--amber-400)" }[accent]
    : null;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: PADS[padding] || PADS.md,
        boxShadow: interactive && hover ? "var(--shadow-md)" : shadowMap[elevation],
        borderTop: accentColor ? `3px solid ${accentColor}` : undefined,
        transform: interactive && hover ? "translateY(-2px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

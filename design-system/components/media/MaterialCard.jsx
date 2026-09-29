import React from "react";

/**
 * Material / part tile — product image with a name and a count subtitle.
 * Used in "what's in the kit" grids.
 */
export function MaterialCard({ src, alt = "", name, count, note, style = {}, ...rest }) {
  const subtitle = [count, note].filter(Boolean).join(" · ");
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{
        background: "var(--neutral-50)",
        borderRadius: "var(--radius-md)",
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-3)",
      }}>
        <img src={src} alt={alt} style={{ maxWidth: "84%", maxHeight: 96, objectFit: "contain" }} />
      </div>
      <div>
        <div style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-strong)" }}>{name}</div>
        {subtitle && (
          <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--teal-600)", marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

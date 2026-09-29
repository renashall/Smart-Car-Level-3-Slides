import React from "react";

/**
 * Screenshot card — a wide window/display capture with a step badge and a
 * one or two line instruction caption together along the bottom-left.
 */
export function ScreenshotCard({
  src,
  alt = "",
  step,
  stepLabel = "Step",
  caption,
  background = "var(--neutral-100)",
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-md)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ background, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {(step != null || caption) && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          padding: "var(--space-4) var(--space-5)",
          borderTop: "1px solid var(--border-subtle)",
        }}>
          {step != null && (
            <span
              style={{
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 12px",
                background: "var(--navy-600)",
                color: "var(--neutral-0)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.01em",
                borderRadius: "var(--radius-pill)",
                whiteSpace: "nowrap",
              }}
            >
              {stepLabel} {step}
            </span>
          )}
          {caption && (
            <span style={{
              fontSize: "var(--text-base)",
              lineHeight: "var(--leading-snug)",
              color: "var(--text-body)",
            }}>
              {caption}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

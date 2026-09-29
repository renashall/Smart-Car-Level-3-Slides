import React from "react";

/**
 * Large plain image frame — no title, no padding, just a rounded image.
 * Use for hero product shots, full-bleed photos and diagrams.
 */
export function ImageFrame({
  src,
  alt = "",
  fit = "cover",
  background = "transparent",
  radius = "var(--radius-xl)",
  pad = false,
  shadow = "var(--shadow-md)",
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        background,
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: shadow,
        border: background === "transparent" ? "none" : "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: pad ? "var(--space-6)" : 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          display: "block",
        }}
      />
    </div>
  );
}

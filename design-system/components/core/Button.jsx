import React from "react";

const VARIANTS = {
  primary: {
    "--_bg": "var(--navy-600)",
    "--_bg-hover": "var(--navy-700)",
    "--_bg-active": "var(--navy-800)",
    "--_fg": "var(--neutral-0)",
    "--_border": "transparent",
  },
  accent: {
    "--_bg": "var(--teal-300)",
    "--_bg-hover": "var(--teal-400)",
    "--_bg-active": "var(--teal-500)",
    "--_fg": "var(--navy-900)",
    "--_border": "transparent",
  },
  secondary: {
    "--_bg": "var(--neutral-0)",
    "--_bg-hover": "var(--neutral-50)",
    "--_bg-active": "var(--neutral-100)",
    "--_fg": "var(--navy-700)",
    "--_border": "var(--border-default)",
  },
  ghost: {
    "--_bg": "transparent",
    "--_bg-hover": "var(--navy-50)",
    "--_bg-active": "var(--navy-100)",
    "--_fg": "var(--navy-700)",
    "--_border": "transparent",
  },
  danger: {
    "--_bg": "var(--red-600)",
    "--_bg-hover": "var(--red-700)",
    "--_bg-active": "var(--red-700)",
    "--_fg": "var(--neutral-0)",
    "--_border": "transparent",
  },
};

const SIZES = {
  sm: { padding: "8px 14px", fontSize: "var(--text-sm)", radius: "var(--radius-sm)", gap: "6px" },
  md: { padding: "11px 20px", fontSize: "var(--text-base)", radius: "var(--radius-md)", gap: "8px" },
  lg: { padding: "15px 28px", fontSize: "var(--text-md)", radius: "var(--radius-md)", gap: "10px" },
};

/**
 * AI Code Academy primary action button.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const bg = disabled
    ? "var(--neutral-200)"
    : active
    ? "var(--_bg-active)"
    : hover
    ? "var(--_bg-hover)"
    : "var(--_bg)";

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        ...v,
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        lineHeight: 1.1,
        color: disabled ? "var(--neutral-400)" : "var(--_fg)",
        background: bg,
        border: `1.5px solid ${disabled ? "transparent" : "var(--_border)"}`,
        borderRadius: s.radius,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
        transform: active && !disabled ? "translateY(1px)" : "none",
        boxShadow: variant === "primary" || variant === "accent" || variant === "danger"
          ? (disabled ? "none" : "var(--shadow-xs)") : "none",
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

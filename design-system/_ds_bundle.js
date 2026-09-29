/* @ds-bundle: {"format":3,"namespace":"DesignSystem_df7c10","components":[{"name":"IconDescCard","sourcePath":"components/blocks/IconDescCard.jsx"},{"name":"InfoCard","sourcePath":"components/blocks/InfoCard.jsx"},{"name":"MiniChecklist","sourcePath":"components/blocks/MiniChecklist.jsx"},{"name":"TierList","sourcePath":"components/blocks/TierList.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CodeBlock","sourcePath":"components/core/CodeBlock.jsx"},{"name":"CheckList","sourcePath":"components/lists/CheckList.jsx"},{"name":"IconList","sourcePath":"components/lists/IconList.jsx"},{"name":"NumberedList","sourcePath":"components/lists/NumberedList.jsx"},{"name":"StepList","sourcePath":"components/lists/StepList.jsx"},{"name":"ImageFrame","sourcePath":"components/media/ImageFrame.jsx"},{"name":"MaterialCard","sourcePath":"components/media/MaterialCard.jsx"},{"name":"ScreenshotCard","sourcePath":"components/media/ScreenshotCard.jsx"},{"name":"VideoCard","sourcePath":"components/media/VideoCard.jsx"}],"sourceHashes":{"components/blocks/IconDescCard.jsx":"54ac07785b21","components/blocks/InfoCard.jsx":"c46f0fd92dca","components/blocks/MiniChecklist.jsx":"919494c29f6c","components/blocks/TierList.jsx":"5218f7e6710c","components/core/Badge.jsx":"4e51926d36ad","components/core/Button.jsx":"a51b297b62cd","components/core/Callout.jsx":"2d852e073535","components/core/Card.jsx":"9573fea52ed8","components/core/CodeBlock.jsx":"917669bfbe3e","components/lists/CheckList.jsx":"5fb3301b2a27","components/lists/IconList.jsx":"2a541da4d045","components/lists/NumberedList.jsx":"d828d7f45a20","components/lists/StepList.jsx":"d1baad0648ef","components/media/ImageFrame.jsx":"0d3bcbbd42b3","components/media/MaterialCard.jsx":"4794e10c8284","components/media/ScreenshotCard.jsx":"bb64fcc92683","components/media/VideoCard.jsx":"f1a2b3c4d5e6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_df7c10 = window.DesignSystem_df7c10 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blocks/IconDescCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon-and-description box — a circular symbol badge over a title and a short
 * description. The thank-you slide "ways to reach me" / step-box pattern.
 * `glass` styles it for a dark (navy) slide; otherwise it's a white card.
 */
function IconDescCard({
  symbol,
  title,
  text,
  glass = false,
  style = {},
  ...rest
}) {
  const surface = glass ? {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)"
  } : {
    background: "var(--surface-card)",
    border: "1px solid var(--border-subtle)",
    boxShadow: "var(--shadow-sm)"
  };
  const titleColor = glass ? "#fff" : "var(--text-strong)";
  const textColor = glass ? "var(--teal-100)" : "var(--text-muted)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      padding: "22px 24px",
      fontFamily: "var(--font-sans)",
      ...surface,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "var(--radius-circle)",
      background: "var(--teal-300)",
      color: "var(--navy-900)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 19,
      fontWeight: 800,
      marginBottom: 14
    }
  }, symbol), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-lg)",
      fontWeight: 700,
      color: titleColor,
      margin: "0 0 5px"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: textColor,
      lineHeight: 1.45
    }
  }, text));
}
Object.assign(__ds_scope, { IconDescCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/IconDescCard.jsx", error: String((e && e.message) || e) }); }

// components/blocks/InfoCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Info card — a filled navy panel with an optional badge or eyebrow, a title,
 * and body text. Used for "Questions?" and "Up next" style call-out cards.
 */
function InfoCard({
  eyebrow,
  badge,
  title,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--navy-600)",
      borderRadius: "var(--radius-xl)",
      padding: "34px",
      color: "#fff",
      boxShadow: "var(--shadow-lg)",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), badge != null && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-circle)",
      background: "var(--teal-300)",
      color: "var(--navy-900)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
      fontWeight: 800,
      marginBottom: 20
    }
  }, badge), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--teal-300)",
      marginBottom: 12
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: "#fff",
      lineHeight: 1.15,
      margin: "0 0 12px"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-md)",
      color: "var(--teal-100)",
      lineHeight: 1.55
    }
  }, children));
}
Object.assign(__ds_scope, { InfoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/InfoCard.jsx", error: String((e && e.message) || e) }); }

// components/blocks/MiniChecklist.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mini checklist — a compact list of ✓ items. The coach "every class" reminder
 * pattern. `onDark` (default) styles white text for a navy card.
 */
function MiniChecklist({
  items = [],
  onDark = true,
  divided = true,
  style = {},
  ...rest
}) {
  const color = onDark ? "#fff" : "var(--text-strong)";
  const line = onDark ? "rgba(255,255,255,.15)" : "var(--border-subtle)";
  const tick = onDark ? "var(--teal-300)" : "var(--status-success)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color,
      lineHeight: 1.4,
      padding: "8px 0",
      borderTop: i === 0 || !divided ? "none" : `1px solid ${line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: tick,
      fontWeight: 800
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, it))));
}
Object.assign(__ds_scope, { MiniChecklist });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/MiniChecklist.jsx", error: String((e && e.message) || e) }); }

// components/blocks/TierList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tier list — rows of a small tag (count) and a bold label. The certificate
 * tiers pattern (High Honors / Honors / Regular). Styled for a dark card.
 */
function TierList({
  items = [],
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: "var(--text-base)",
      padding: "7px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 22,
      textAlign: "center",
      background: "var(--amber-400)",
      color: "#fff",
      fontWeight: 800,
      borderRadius: 6,
      padding: "1px 6px",
      fontSize: "var(--text-xs)"
    }
  }, it.tag), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#fff",
      fontWeight: 700
    }
  }, it.label))));
}
Object.assign(__ds_scope, { TierList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/TierList.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  navy: {
    bg: "var(--navy-100)",
    fg: "var(--navy-700)"
  },
  teal: {
    bg: "var(--teal-100)",
    fg: "var(--teal-700)"
  },
  amber: {
    bg: "var(--amber-100)",
    fg: "var(--amber-800)"
  },
  neutral: {
    bg: "var(--neutral-100)",
    fg: "var(--neutral-700)"
  },
  success: {
    bg: "var(--status-success-bg)",
    fg: "var(--status-success)"
  },
  warning: {
    bg: "var(--status-warning-bg)",
    fg: "var(--amber-800)"
  },
  error: {
    bg: "var(--status-error-bg)",
    fg: "var(--status-error)"
  },
  solid: {
    bg: "var(--navy-600)",
    fg: "var(--neutral-0)"
  }
};

/**
 * Small pill label for status, categories and lesson tags.
 */
function Badge({
  tone = "neutral",
  children,
  icon = null,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  primary: {
    "--_bg": "var(--navy-600)",
    "--_bg-hover": "var(--navy-700)",
    "--_bg-active": "var(--navy-800)",
    "--_fg": "var(--neutral-0)",
    "--_border": "transparent"
  },
  accent: {
    "--_bg": "var(--teal-300)",
    "--_bg-hover": "var(--teal-400)",
    "--_bg-active": "var(--teal-500)",
    "--_fg": "var(--navy-900)",
    "--_border": "transparent"
  },
  secondary: {
    "--_bg": "var(--neutral-0)",
    "--_bg-hover": "var(--neutral-50)",
    "--_bg-active": "var(--neutral-100)",
    "--_fg": "var(--navy-700)",
    "--_border": "var(--border-default)"
  },
  ghost: {
    "--_bg": "transparent",
    "--_bg-hover": "var(--navy-50)",
    "--_bg-active": "var(--navy-100)",
    "--_fg": "var(--navy-700)",
    "--_border": "transparent"
  },
  danger: {
    "--_bg": "var(--red-600)",
    "--_bg-hover": "var(--red-700)",
    "--_bg-active": "var(--red-700)",
    "--_fg": "var(--neutral-0)",
    "--_border": "transparent"
  }
};
const SIZES = {
  sm: {
    padding: "8px 14px",
    fontSize: "var(--text-sm)",
    radius: "var(--radius-sm)",
    gap: "6px"
  },
  md: {
    padding: "11px 20px",
    fontSize: "var(--text-base)",
    radius: "var(--radius-md)",
    gap: "8px"
  },
  lg: {
    padding: "15px 28px",
    fontSize: "var(--text-md)",
    radius: "var(--radius-md)",
    gap: "10px"
  }
};

/**
 * AI Code Academy primary action button.
 */
function Button({
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
  const bg = disabled ? "var(--neutral-200)" : active ? "var(--_bg-active)" : hover ? "var(--_bg-hover)" : "var(--_bg)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
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
      boxShadow: variant === "primary" || variant === "accent" || variant === "danger" ? disabled ? "none" : "var(--shadow-xs)" : "none",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const KINDS = {
  note: {
    bg: "var(--navy-50)",
    bar: "var(--navy-600)",
    fg: "var(--navy-700)",
    label: "Note"
  },
  tip: {
    bg: "var(--green-100)",
    bar: "var(--green-400)",
    fg: "var(--green-700)",
    label: "Tip"
  },
  warning: {
    bg: "var(--amber-50)",
    bar: "var(--amber-400)",
    fg: "var(--amber-800)",
    label: "Heads up"
  },
  dont: {
    bg: "var(--status-error-bg)",
    bar: "var(--status-error)",
    fg: "var(--status-error)",
    label: "Don't"
  }
};

/**
 * Teaching call-out box — tips, notes and warnings inside lessons & slides.
 */
function Callout({
  kind = "note",
  title,
  icon = null,
  children,
  style = {},
  ...rest
}) {
  const k = KINDS[kind] || KINDS.note;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "var(--space-3)",
      background: k.bg,
      borderLeft: `4px solid ${k.bar}`,
      borderRadius: "var(--radius-md)",
      padding: "var(--space-4) var(--space-5)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 26,
      height: 26
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: k.fg,
      marginBottom: "4px"
    }
  }, title || k.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PADS = {
  sm: "var(--space-4)",
  md: "var(--space-5)",
  lg: "var(--space-6)"
};

/**
 * Surface container — the workhorse panel for lessons, materials and slide blocks.
 */
function Card({
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
    lg: "var(--shadow-lg)"
  };
  const accentColor = accent ? {
    navy: "var(--navy-600)",
    teal: "var(--teal-300)",
    amber: "var(--amber-400)"
  }[accent] : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dark code / terminal panel for lesson commands and snippets.
 */
function CodeBlock({
  language = "bash",
  title = null,
  prompt = false,
  children,
  style = {},
  ...rest
}) {
  const lines = String(children).replace(/\n$/, "").split("\n");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-code)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      boxShadow: "var(--shadow-md)",
      fontFamily: "var(--font-mono)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 14px",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--red-400)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--amber-400)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--teal-300)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "8px",
      fontSize: "var(--text-xs)",
      color: "var(--neutral-400)",
      letterSpacing: "0.03em"
    }
  }, title || language)), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: "16px 18px",
      overflowX: "auto"
    }
  }, lines.map((ln, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: "13.5px",
      lineHeight: 1.75,
      color: "#e8eaed",
      whiteSpace: "pre"
    }
  }, prompt && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--teal-300)",
      userSelect: "none"
    }
  }, "$\xA0"), ln))));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/lists/CheckList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checklist — vertical list of items each marked with a green tick.
 * Items can be plain strings (all ticked) or { text, checked }.
 */
function CheckList({
  items = [],
  size = "md",
  style = {},
  ...rest
}) {
  const fs = size === "lg" ? "var(--text-lg)" : size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const dim = size === "lg" ? 30 : size === "sm" ? 22 : 26;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const text = typeof it === "string" ? it : it.text;
    const checked = typeof it === "string" ? true : it.checked !== false;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "12px 0",
        borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
        fontSize: fs,
        color: "var(--text-strong)",
        fontWeight: 500
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: dim,
        height: dim,
        borderRadius: "var(--radius-circle)",
        background: checked ? "var(--status-success-bg)" : "var(--neutral-100)",
        color: checked ? "var(--status-success)" : "var(--neutral-400)",
        border: checked ? "none" : "1px solid var(--border-default)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: dim * 0.5
      }
    }, checked ? "✓" : ""), /*#__PURE__*/React.createElement("span", {
      style: {
        color: checked ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, text));
  }));
}
Object.assign(__ds_scope, { CheckList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/CheckList.jsx", error: String((e && e.message) || e) }); }

// components/lists/IconList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon list — rows of an icon (image) with a bold title and a description line.
 * The "common issues / features" list pattern.
 */
function IconList({
  items = [],
  iconSize = 34,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "flex-start",
      padding: "15px 0",
      borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)"
    }
  }, it.icon && /*#__PURE__*/React.createElement("img", {
    src: it.icon,
    alt: "",
    style: {
      width: iconSize,
      height: iconSize,
      flexShrink: 0,
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-lg)",
      fontWeight: 700,
      color: "var(--text-strong)",
      margin: "0 0 3px"
    }
  }, it.title), it.text && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-base)",
      color: "var(--text-muted)",
      lineHeight: 1.45
    }
  }, it.text)))));
}
Object.assign(__ds_scope, { IconList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/IconList.jsx", error: String((e && e.message) || e) }); }

// components/lists/NumberedList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Numbered checklist — green numbered markers (CheckList + StepList combined).
 * Items can be plain strings or { title, body }.
 */
function NumberedList({
  items = [],
  start = 1,
  size = "md",
  style = {},
  ...rest
}) {
  const fs = size === "lg" ? "var(--text-lg)" : size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const dim = size === "lg" ? 36 : size === "sm" ? 26 : 32;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const title = typeof it === "string" ? it : it.title;
    const body = typeof it === "string" ? null : it.body;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: "var(--space-3)",
        alignItems: "flex-start",
        padding: "13px 0",
        borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: dim,
        height: dim,
        borderRadius: "var(--radius-circle)",
        background: "var(--green-100)",
        color: "var(--green-700)",
        border: "1.5px solid var(--green-400)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: dim * 0.44
      }
    }, start + i), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: fs,
        color: "var(--text-strong)",
        fontWeight: body ? 700 : 500,
        lineHeight: 1.35
      }
    }, title), body && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-sm)",
        color: "var(--text-muted)",
        lineHeight: 1.45,
        marginTop: 2
      }
    }, body)));
  }));
}
Object.assign(__ds_scope, { NumberedList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/NumberedList.jsx", error: String((e && e.message) || e) }); }

// components/lists/StepList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Step list — numbered 1·2·3 steps with navy circle markers. Items can be
 * plain strings or { title, body } for a bold lead + supporting line.
 */
function StepList({
  items = [],
  start = 1,
  size = "md",
  style = {},
  ...rest
}) {
  const fs = size === "lg" ? "var(--text-lg)" : size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  const dim = size === "lg" ? 36 : size === "sm" ? 26 : 30;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const title = typeof it === "string" ? it : it.title;
    const body = typeof it === "string" ? null : it.body;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: "var(--space-3)",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: dim,
        height: dim,
        borderRadius: "var(--radius-circle)",
        background: "var(--navy-600)",
        color: "var(--neutral-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: dim * 0.46
      }
    }, start + i), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: fs,
        color: "var(--text-strong)",
        fontWeight: body ? 700 : 500,
        lineHeight: 1.4
      }
    }, title), body && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-sm)",
        color: "var(--text-muted)",
        lineHeight: 1.45,
        marginTop: 2
      }
    }, body)));
  }));
}
Object.assign(__ds_scope, { StepList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/StepList.jsx", error: String((e && e.message) || e) }); }

// components/media/ImageFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Large plain image frame — no title, no padding, just a rounded image.
 * Use for hero product shots, full-bleed photos and diagrams.
 */
function ImageFrame({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: fit,
      display: "block"
    }
  }));
}
Object.assign(__ds_scope, { ImageFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/ImageFrame.jsx", error: String((e && e.message) || e) }); }

// components/media/MaterialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Material / part tile — product image with a name and a count subtitle.
 * Used in "what's in the kit" grids.
 */
function MaterialCard({
  src,
  alt = "",
  name,
  count,
  note,
  style = {},
  ...rest
}) {
  const subtitle = [count, note].filter(Boolean).join(" · ");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-4)",
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--neutral-50)",
      borderRadius: "var(--radius-md)",
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      maxWidth: "84%",
      maxHeight: 96,
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-md)",
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, name), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginTop: 2
    }
  }, subtitle)));
}
Object.assign(__ds_scope, { MaterialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/MaterialCard.jsx", error: String((e && e.message) || e) }); }

// components/media/ScreenshotCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Screenshot card — a wide window/display capture with a step badge and a
 * one or two line instruction caption together along the bottom-left.
 */
function ScreenshotCard({
  src,
  alt = "",
  step,
  stepLabel = "Step",
  caption,
  background = "var(--neutral-100)",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-md)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), (step != null || caption) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-5)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, step != null && /*#__PURE__*/React.createElement("span", {
    style: {
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
      whiteSpace: "nowrap"
    }
  }, stepLabel, " ", step), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-body)"
    }
  }, caption)));
}
Object.assign(__ds_scope, { ScreenshotCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/ScreenshotCard.jsx", error: String((e && e.message) || e) }); }

// components/media/VideoCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Video / link card — a clickable poster image with a centered play overlay and
 * a bottom-left subtitle pairing a small thumbnail with a clickable link. The
 * whole card is one anchor. Use for "watch the video" / external-resource cards.
 */
function VideoCard({
  src,
  alt = "",
  href = "#",
  title,
  meta,
  thumbSrc,
  play = true,
  background = "var(--neutral-50)",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
      transform: hover ? "translateY(-3px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      minHeight: 0,
      background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      maxWidth: "88%",
      maxHeight: "90%",
      objectFit: "contain",
      display: "block"
    }
  }), play && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: 74,
      height: 74,
      borderRadius: "var(--radius-circle)",
      background: "rgba(34,66,137,0.92)",
      boxShadow: "0 8px 22px rgba(19,33,66,0.34)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 5,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "14px 0 14px 23px",
      borderColor: "transparent transparent transparent #fff"
    }
  }))), (title || thumbSrc) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-5)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, thumbSrc ? /*#__PURE__*/React.createElement("img", {
    src: thumbSrc,
    alt: "",
    style: {
      flexShrink: 0,
      width: 50,
      height: 38,
      objectFit: "contain",
      padding: 3,
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border-subtle)",
      background: "var(--neutral-50)"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 40,
      height: 40,
      borderRadius: 10,
      background: "var(--teal-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 3,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "8px 0 8px 13px",
      borderColor: "transparent transparent transparent var(--teal-600)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-md)",
      fontWeight: 800,
      color: "var(--navy-700)",
      textDecoration: "underline",
      lineHeight: 1.2
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, meta))));
}
Object.assign(__ds_scope, { VideoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/VideoCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.IconDescCard = __ds_scope.IconDescCard;

__ds_ns.InfoCard = __ds_scope.InfoCard;

__ds_ns.MiniChecklist = __ds_scope.MiniChecklist;

__ds_ns.TierList = __ds_scope.TierList;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.CheckList = __ds_scope.CheckList;

__ds_ns.IconList = __ds_scope.IconList;

__ds_ns.NumberedList = __ds_scope.NumberedList;

__ds_ns.StepList = __ds_scope.StepList;

__ds_ns.ImageFrame = __ds_scope.ImageFrame;

__ds_ns.MaterialCard = __ds_scope.MaterialCard;

__ds_ns.ScreenshotCard = __ds_scope.ScreenshotCard;

__ds_ns.VideoCard = __ds_scope.VideoCard;

})();

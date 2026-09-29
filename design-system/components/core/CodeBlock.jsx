import React from "react";

/**
 * Dark code / terminal panel for lesson commands and snippets.
 */
export function CodeBlock({
  language = "bash",
  title = null,
  prompt = false,
  children,
  style = {},
  ...rest
}) {
  const lines = String(children).replace(/\n$/, "").split("\n");
  return (
    <div
      style={{
        background: "var(--surface-code)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-md)",
        fontFamily: "var(--font-mono)",
        ...style,
      }}
      {...rest}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--red-400)" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--amber-400)" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--teal-300)" }} />
        <span style={{
          marginLeft: "8px",
          fontSize: "var(--text-xs)",
          color: "var(--neutral-400)",
          letterSpacing: "0.03em",
        }}>{title || language}</span>
      </div>
      <pre style={{ margin: 0, padding: "16px 18px", overflowX: "auto" }}>
        {lines.map((ln, i) => (
          <div key={i} style={{ fontSize: "13.5px", lineHeight: 1.75, color: "#e8eaed", whiteSpace: "pre" }}>
            {prompt && <span style={{ color: "var(--teal-300)", userSelect: "none" }}>$&nbsp;</span>}
            {ln}
          </div>
        ))}
      </pre>
    </div>
  );
}

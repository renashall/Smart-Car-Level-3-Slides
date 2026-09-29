import * as React from "react";

export type CalloutKind = "note" | "tip" | "warning" | "dont";

/**
 * Teaching call-out box for notes, tips, warnings and "don't" rules inside
 * lessons and slides. Color carries the meaning:
 *   tip → green · warning → amber · dont → red · note → navy.
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic kind, sets color + default label.
   *  `tip` (green), `warning` (amber, "Heads up"), `dont` (red, "Don't"),
   *  `note` (navy). @default "note" */
  kind?: CalloutKind;
  /** Override the uppercase label (defaults per kind). */
  title?: string;
  /** Optional leading icon node (e.g. a course PNG icon). */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Callout(props: CalloutProps): JSX.Element;

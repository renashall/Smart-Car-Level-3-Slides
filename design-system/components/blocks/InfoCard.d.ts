import * as React from "react";

/**
 * Filled navy info card with an optional badge or eyebrow, a title and body.
 * Use for "Questions?" prompts and "Up next" call-outs.
 */
export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small uppercase teal label above the title (e.g. "Up next"). */
  eyebrow?: string;
  /** Symbol shown in a teal circle above the title (e.g. "?"). */
  badge?: React.ReactNode;
  /** Card heading (may contain line breaks). */
  title: React.ReactNode;
  /** Body text. */
  children?: React.ReactNode;
}

export declare function InfoCard(props: InfoCardProps): JSX.Element;

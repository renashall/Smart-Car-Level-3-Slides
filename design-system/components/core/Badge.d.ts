import * as React from "react";

export type BadgeTone =
  | "navy" | "teal" | "amber" | "neutral"
  | "success" | "warning" | "error" | "solid";

/**
 * Small rounded pill for statuses, lesson numbers and category tags.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "neutral" */
  tone?: BadgeTone;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;

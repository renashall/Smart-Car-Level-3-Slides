import * as React from "react";

export type CardPadding = "sm" | "md" | "lg";
export type CardElevation = "none" | "xs" | "sm" | "md" | "lg";
export type CardAccent = "navy" | "teal" | "amber";

/**
 * Rounded white surface panel — the base container for lessons, material
 * tiles and slide content blocks.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding. @default "md" */
  padding?: CardPadding;
  /** Resting shadow depth. @default "sm" */
  elevation?: CardElevation;
  /** Lift + shadow on hover. @default false */
  interactive?: boolean;
  /** Optional colored top accent bar. */
  accent?: CardAccent;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;

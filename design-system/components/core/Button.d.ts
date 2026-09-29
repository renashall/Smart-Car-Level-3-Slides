import * as React from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Primary interactive control for AI Code Academy interfaces and slides.
 * Use `primary` (navy) for the main action, `accent` (teal) for friendly/positive
 * actions, `secondary`/`ghost` for lower emphasis, `danger` for destructive.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: ButtonVariant;
  /** Control size. @default "md" */
  size?: ButtonSize;
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Disable interaction. @default false */
  disabled?: boolean;
  /** Element rendered before the label (icon/img). */
  iconLeft?: React.ReactNode;
  /** Element rendered after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;

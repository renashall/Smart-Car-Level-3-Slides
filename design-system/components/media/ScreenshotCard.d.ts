import * as React from "react";

/**
 * Screenshot card — a wide window/display capture with a step badge and a 1–2
 * line instruction caption together along the bottom-left, under the image.
 */
export interface ScreenshotCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Screenshot image source. */
  src: string;
  /** Alt text. */
  alt?: string;
  /** Step number/label shown in the bottom-left badge (omit for no badge). */
  step?: string | number;
  /** Word before the step number. @default "Step" */
  stepLabel?: string;
  /** One or two line instruction under the image. */
  caption?: React.ReactNode;
  /** Background behind the image (for letterboxed shots). @default "var(--neutral-100)" */
  background?: string;
}

export declare function ScreenshotCard(props: ScreenshotCardProps): JSX.Element;

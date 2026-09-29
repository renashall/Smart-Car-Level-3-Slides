import * as React from "react";

/**
 * Large plain image frame — no title or inner padding, just a rounded image.
 * For hero product shots, full-bleed photos and diagrams. Size it from the
 * parent (give the wrapper a width/height); the image fills it.
 */
export interface ImageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source. */
  src: string;
  /** Alt text. */
  alt?: string;
  /** object-fit. Use "contain" for transparent product cut-outs. @default "cover" */
  fit?: "cover" | "contain";
  /** Frame background (e.g. "var(--neutral-50)" behind a transparent PNG). @default "transparent" */
  background?: string;
  /** Corner radius. @default "var(--radius-xl)" */
  radius?: string;
  /** Add inner padding around the image. @default false */
  pad?: boolean;
  /** Box shadow. @default "var(--shadow-md)" */
  shadow?: string;
}

export declare function ImageFrame(props: ImageFrameProps): JSX.Element;

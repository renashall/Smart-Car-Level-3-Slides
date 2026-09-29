import * as React from "react";

/**
 * Icon-and-description box — circular symbol badge + title + short description.
 * The thank-you slide "ways to reach me" pattern. Lay several in a flex row.
 */
export interface IconDescCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Symbol shown in the teal circle (e.g. "?", "★"). */
  symbol: React.ReactNode;
  /** Box title. */
  title: React.ReactNode;
  /** Description line. */
  text?: React.ReactNode;
  /** Style for a dark/navy slide (translucent). @default false */
  glass?: boolean;
}

export declare function IconDescCard(props: IconDescCardProps): JSX.Element;

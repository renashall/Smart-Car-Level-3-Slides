import * as React from "react";

/**
 * Material / hardware tile — a product image with a name and a count subtitle
 * (e.g. "×1 · the brain"). The building block of "what's in the kit" grids.
 */
export interface MaterialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source (a course material PNG). */
  src: string;
  /** Alt text. */
  alt?: string;
  /** Part name, e.g. "Raspberry Pi 4". */
  name: string;
  /** Quantity, e.g. "×1" or "×4". */
  count?: string;
  /** Short role note, e.g. "the brain". */
  note?: string;
}

export declare function MaterialCard(props: MaterialCardProps): JSX.Element;

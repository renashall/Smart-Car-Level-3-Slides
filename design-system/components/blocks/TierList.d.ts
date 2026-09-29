import * as React from "react";

export interface Tier {
  /** Short count tag, e.g. "×1" or "all". */
  tag: string;
  /** Bold label, e.g. "High Honors". */
  label: string;
}

/**
 * Tier list — rows of a count tag + bold label (certificate tiers). Designed to
 * sit on a dark card; tags are amber with white text, labels white.
 */
export interface TierListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The tiers. */
  items: Tier[];
}

export declare function TierList(props: TierListProps): JSX.Element;

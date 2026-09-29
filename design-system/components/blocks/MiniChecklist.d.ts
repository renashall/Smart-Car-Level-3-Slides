import * as React from "react";

/**
 * Mini checklist — compact ✓ items. The coach "every class" reminder pattern.
 */
export interface MiniChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reminder lines. */
  items: string[];
  /** White text for a dark/navy card. @default true */
  onDark?: boolean;
  /** Hairline dividers between rows. @default true */
  divided?: boolean;
}

export declare function MiniChecklist(props: MiniChecklistProps): JSX.Element;

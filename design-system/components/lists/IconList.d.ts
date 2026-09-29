import * as React from "react";

export interface IconListItem {
  /** Image source for the row icon (a course PNG). */
  icon?: string;
  /** Bold row title. */
  title: string;
  /** Description line under the title. */
  text?: string;
}

/**
 * Icon list — rows of icon + bold title + description. The "common issues" /
 * feature-list pattern.
 */
export interface IconListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The rows. */
  items: IconListItem[];
  /** Icon px size. @default 34 */
  iconSize?: number;
}

export declare function IconList(props: IconListProps): JSX.Element;

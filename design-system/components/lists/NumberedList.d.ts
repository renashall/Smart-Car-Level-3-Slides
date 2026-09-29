import * as React from "react";

export interface NumberedListItem {
  /** Bold lead line. */
  title: string;
  /** Optional supporting line. */
  body?: string;
}

/**
 * Numbered checklist with green numbered markers — a CheckList/StepList hybrid.
 * Use for ordered goals and "you'll be able to" lists.
 */
export interface NumberedListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items as plain strings or { title, body } objects. */
  items: Array<string | NumberedListItem>;
  /** First number. @default 1 */
  start?: number;
  /** Text + marker size. @default "md" */
  size?: "sm" | "md" | "lg";
}

export declare function NumberedList(props: NumberedListProps): JSX.Element;

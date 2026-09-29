import * as React from "react";

export interface CheckListItem {
  text: string;
  /** Show a green tick (else an empty circle). @default true */
  checked?: boolean;
}

/**
 * Checklist — vertical list of items each marked with a green tick. Use for
 * recaps ("what you got working"), requirements and done-states.
 */
export interface CheckListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items as plain strings (all ticked) or { text, checked } objects. */
  items: Array<string | CheckListItem>;
  /** Text + marker size. @default "md" */
  size?: "sm" | "md" | "lg";
}

export declare function CheckList(props: CheckListProps): JSX.Element;

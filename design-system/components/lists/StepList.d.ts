import * as React from "react";

export interface StepListItem {
  /** Bold lead line for the step. */
  title: string;
  /** Optional supporting line under the title. */
  body?: string;
}

/**
 * Numbered step list (1·2·3) with navy circle markers. Use for procedures and
 * "do this, then this" instructions.
 */
export interface StepListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Steps as plain strings or { title, body } objects. */
  items: Array<string | StepListItem>;
  /** First number. @default 1 */
  start?: number;
  /** Text + marker size. @default "md" */
  size?: "sm" | "md" | "lg";
}

export declare function StepList(props: StepListProps): JSX.Element;

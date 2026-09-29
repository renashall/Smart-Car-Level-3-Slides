import * as React from "react";

/**
 * Dark terminal-style panel for lesson commands and code snippets, with a
 * traffic-light title bar and optional `$` prompts.
 */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Language/label shown in the title bar when `title` is unset. @default "bash" */
  language?: string;
  /** Custom title-bar text. */
  title?: string;
  /** Render a teal `$` prompt before each line. @default false */
  prompt?: boolean;
  /** Code as a text string (newline-separated). */
  children?: React.ReactNode;
}

export declare function CodeBlock(props: CodeBlockProps): JSX.Element;

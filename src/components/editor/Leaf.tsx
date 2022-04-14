import { RenderLeafProps } from "slate-react";

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  if (leaf["inline-code"]) {
    children = (
      <code className="bg-neutral-300 dark:bg-dark-3 p-0.5 px-1 rounded-md">{children}</code>
    );
  }

  return <span {...attributes}>{children}</span>;
}

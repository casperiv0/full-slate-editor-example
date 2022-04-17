import classNames from "classnames";
import { RenderLeafProps } from "slate-react";

function getColorsForLeaf(leaf: RenderLeafProps["leaf"]) {
  const colors: [boolean | undefined, string][] = [
    [leaf.comment, "text-[slategray]"],
    [leaf.operator || leaf.url, "text-[#9a6e3a]"],
    [leaf.keyword, "text-[#07a]"],
    [leaf.variable || leaf.regex, "text-[#e90]"],
    [
      leaf.number ||
        leaf.boolean ||
        leaf.tag ||
        leaf.constant ||
        leaf.symbol ||
        leaf["attr-name"] ||
        leaf.selector,
      "text-[#905]",
    ],
    [leaf.punctuation, "text-[#999]"],
    [leaf.string || leaf.char, "text-[#690]"],
    [leaf.function || leaf["class-name"], "text-[#dd4a68]"],
  ];

  const [, color] = colors.find(([truthy]) => !!truthy) ?? [];
  return color;
}

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  const color = getColorsForLeaf(leaf);

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
      <code className="bg-neutral-300 dark:bg-dark-3 p-0.5 px-1 rounded-md text-[gray]">
        {children}
      </code>
    );
  }

  return (
    <span {...attributes} className={classNames(color)}>
      {children}
    </span>
  );
}

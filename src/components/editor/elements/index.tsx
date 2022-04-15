import { ElementType, SlateElements, TextAlignment } from "../types";
import type { RenderElementProps } from "slate-react";
import { CheckListItemElement } from "./CheckListItemElement";
import { LinkElement } from "./LinkElement";
import classNames from "classnames";

type ComponentItem = (props: RenderElementProps & { element: SlateElements }) => JSX.Element;

const components: Record<string, ComponentItem> = {
  [ElementType.Blockquote]: ({ children, attributes, element }) => (
    <blockquote
      {...attributes}
      className={classNames(
        "border-l-[3px] dark:border-[#3f3f3f] pl-2",
        "align" in element ? element.align : null,
      )}
    >
      {children}
    </blockquote>
  ),
  [ElementType.BulletedList]: ({ children, attributes }) => <ul {...attributes}>{children}</ul>,
  [ElementType.H1]: ({ children, attributes, element }) => (
    <h1
      {...attributes}
      className={classNames("text-3xl font-semibold", "align" in element ? element.align : null)}
    >
      {children}
    </h1>
  ),
  [ElementType.H2]: ({ children, attributes, element }) => (
    <h2
      {...attributes}
      className={classNames("text-2xl font-semibold", "align" in element ? element.align : null)}
    >
      {children}
    </h2>
  ),
  [ElementType.H3]: ({ children, attributes, element }) => (
    <h3
      {...attributes}
      className={classNames("text-xl font-semibold", "align" in element ? element.align : null)}
    >
      {children}
    </h3>
  ),
  [ElementType.ListItem]: ({ children, attributes }) => (
    <li {...attributes} data-list-item="true">
      {children}
    </li>
  ),
  [ElementType.CheckListItem]: ({ children, attributes, element }) => (
    <CheckListItemElement {...({ children, attributes, element } as any)} />
  ),
  [ElementType.NumberedList]: ({ children, attributes }) => <ol {...attributes}>{children}</ol>,
  [ElementType.Link]: ({ children, attributes, element }) => (
    <LinkElement {...{ attributes, children, element }} />
  ),
  [ElementType.Delimiter]: ({ attributes, children }) => (
    <span {...attributes}>
      {children}
      <hr className="w-full select-none border-t-2 rounded-md dark:border-[#3f3f3f]" />
    </span>
  ),
};

export function EditorElement({ attributes, children, element }: RenderElementProps) {
  const textAlign = "align" in element ? (element.align as TextAlignment) : null;
  const component = components[element.type] as ComponentItem | undefined;

  if (component) {
    return component({ children, attributes, element });
  }

  return (
    <p className={classNames(textAlign)} {...attributes}>
      {children}
    </p>
  );
}

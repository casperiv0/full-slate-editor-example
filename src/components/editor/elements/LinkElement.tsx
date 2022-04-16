import classNames from "classnames";
import { RenderElementProps } from "slate-react";
import { TextAlignment } from "../types";

interface Props extends RenderElementProps {
  children: React.ReactNode;
  textAlign: TextAlignment | null;
}

export function LinkElement({ children, element, textAlign, attributes }: Props) {
  const url = "url" in element ? element.url : null;

  if (!url) {
    return null;
  }

  return (
    <a
      {...attributes}
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={classNames("underline", textAlign)}
    >
      {children}
    </a>
  );
}

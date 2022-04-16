import * as React from "react";
import classNames from "classnames";
import { RenderElementProps, useFocused, useSelected, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import { ElementType, ParagraphElement } from "../types";

export function HorizontalLineElement({ children, attributes }: RenderElementProps) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  const isFocused = selected && focused;

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        const paragraph: ParagraphElement = {
          type: ElementType.Paragraph,
          children: [{ text: "" }],
        };

        Transforms.insertNodes(editor, [paragraph]);
      }
    };

    if (isFocused) {
      document.addEventListener("keydown", handler);
    }

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [isFocused]);

  return (
    <div {...attributes}>
      {children}

      <div contentEditable={false}>
        <hr
          className={classNames(
            "w-full select-none border-t-2 rounded-md dark:border-[#3f3f3f]",
            isFocused && "ring-2 ring-offset-2 ring-blue-500",
          )}
        />
      </div>
    </div>
  );
}

import * as React from "react";
import classNames from "classnames";
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { Editor, Transforms } from "slate";
import { ElementType, ParagraphElement } from "~/components/editor/types";

export function HorizontalLineElement({ children, element, attributes }: RenderElementProps) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);

  const isFocused = selected && focused;

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        const block = Editor.after(editor, path, {
          distance: 1,
        });

        // don't re-create the paragraph block if it already exists
        if (!block) {
          const paragraph: ParagraphElement = {
            type: ElementType.Paragraph,
            children: [{ text: "" }],
          };

          Transforms.insertNodes(editor, [paragraph]);
        }
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
            "w-full select-none border-t-2 rounded-md dark:border-[#3f3f3f] my-3",
            isFocused && "ring-2 ring-offset-2 ring-blue-500",
          )}
        />
      </div>
    </div>
  );
}

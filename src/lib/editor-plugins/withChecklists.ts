import { Editor, Transforms, Range, Point, Element as SlateElement } from "slate";
import type { SlateEditor } from "../../components/editor/Editor";
import { ElementType } from "../../components/editor/types";

export function withChecklists(editor: SlateEditor) {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === ElementType.CheckListItem,
      });

      if (match) {
        const [, path] = match;
        const start = Editor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          Transforms.setNodes(
            editor,
            { type: ElementType.Paragraph },
            {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === ElementType.CheckListItem,
            },
          );
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  return editor;
}

import type { SlateEditor } from "../../components/editor/Editor";
import { ElementType } from "../../components/editor/types";

export function withVoids(editor: SlateEditor) {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return [ElementType.HorizontalLine].includes(element.type) ? true : isVoid(element);
  };

  return editor;
}

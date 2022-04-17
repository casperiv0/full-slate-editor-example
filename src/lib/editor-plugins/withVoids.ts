import { SlateEditor, ElementType } from "~/components/editor/types";

const VOID_ELEMENTS = [ElementType.HorizontalLine];

export function withVoids(editor: SlateEditor) {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return VOID_ELEMENTS.includes(element.type) ? true : isVoid(element);
  };

  return editor;
}

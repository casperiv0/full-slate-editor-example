import {
  SlateEditor,
  ElementType,
  SlateFormat,
  Text,
  TextAlignment,
} from "~/components/editor/types";
import { Editor, Transforms, Element as SlateElement } from "slate";

const LIST_TYPES = [ElementType.NumberedList, ElementType.BulletedList] as string[];
const TEXT_ALIGN_TYPES = ["text-left", "text-center", "text-right", "text-justify"];

export function isMarkActive(editor: SlateEditor, format: keyof Omit<Text, "text">) {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
}

export function toggleBlock(editor: SlateEditor, format: SlateFormat) {
  const blockType = TEXT_ALIGN_TYPES.includes(format) ? "align" : "type";

  const isActive = isBlockActive(editor, format, blockType);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = { align: isActive ? undefined : (format as TextAlignment) };
  } else {
    newProperties = {
      type: isActive
        ? ElementType.Paragraph
        : isList
        ? ElementType.ListItem
        : (format as SlateElement["type"]),
    };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as SlateElement;
    Transforms.wrapNodes(editor, block);
  }
}

export function toggleMark(editor: SlateEditor, format: keyof Omit<Text, "text">) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(
  editor: SlateEditor,
  format: SlateFormat,
  blockType: "type" | "align" = "type",
) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      // @ts-expect-error todo
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    }),
  );

  return !!match;
}

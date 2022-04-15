import { toggleMark } from "./blocks";
import isHotkey from "is-hotkey";
import React from "react";
import { SlateEditor } from "../../components/editor/Editor";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+s": "strikethrough",
} as const;

export function handleEditorHotkeys(event: React.KeyboardEvent, editor: SlateEditor) {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey)(event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
      toggleMark(editor, mark);
    }
  }
}

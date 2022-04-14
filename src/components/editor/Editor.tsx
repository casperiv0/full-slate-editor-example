import * as React from "react";
import { BaseEditor, Descendant, createEditor } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { type HistoryEditor, withHistory } from "slate-history";
import { Toolbar } from "../toolbar/Toolbar";
import { toggleMark } from "../../lib/editor/utils";
import isHotkey from "is-hotkey";
import { withShortcuts } from "../../lib/editor-plugins/withShortcuts";
import { withChecklists } from "../../lib/editor-plugins/withChecklists";
import type { SlateElements, Text } from "./types";
import { HoverToolbar } from "../toolbar/HoverToolbar";
import { withLinks } from "../../lib/editor-plugins/withLinks";
import { EditorElement } from "./elements/index";
import { Leaf } from "./Leaf";

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: SlateElements;
    Text: Text;
  }
}

interface EditorProps {
  isReadonly?: boolean;
  value: any;
  onChange?(value: Descendant[]): void;
  isShare?: boolean;
}

export const DEFAULT_EDITOR_DATA = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
] as Descendant[];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+s": "strikethrough",
} as const;

export function Editor({ isReadonly, value, isShare, onChange }: EditorProps) {
  const renderElement = React.useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    [],
  );
  const renderLeaf = React.useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = React.useMemo(
    () => withLinks(withChecklists(withShortcuts(withHistory(withReact(createEditor()))))),
    [],
  );

  function handleChange(value: Descendant[]) {
    onChange?.(value);
  }

  return (
    <div
      className="mt-1 px-3"
      data-editor-preview={!isShare}
      style={{ height: "calc(100vh - 10rem)", overflowY: "auto" }}
    >
      <Slate editor={editor} value={value} onChange={handleChange}>
        {isReadonly ? null : (
          <>
            <Toolbar />
            <HoverToolbar />
          </>
        )}

        <Editable
          spellCheck="false"
          autoComplete="off"
          readOnly={isReadonly}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          className="w-full p-1.5 rounded-md bg-transparent disabled:cursor-not-allowed disabled:opacity-80"
          placeholder="Start typing..."
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey)(event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

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

import { withShortcuts } from "../../lib/editor-plugins/withShortcuts";
import { withChecklists } from "../../lib/editor-plugins/withChecklists";
import type { SlateElements, Text } from "./types";
import { HoverToolbar } from "../toolbar/HoverToolbar";
import { withLinks } from "../../lib/editor-plugins/withLinks";
import { EditorElement } from "./elements/index";
import { Leaf } from "./Leaf";
import { handleEditorHotkeys } from "../../lib/editor/utils";

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
}

export const DEFAULT_EDITOR_DATA = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
] as Descendant[];

export function Editor({ isReadonly, value, onChange }: EditorProps) {
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
    <div style={{ height: "calc(100vh - 10rem)", overflowY: "auto" }}>
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
          onKeyDown={(event) => handleEditorHotkeys(event, editor)}
        />
      </Slate>
    </div>
  );
}

import * as React from "react";
import { Descendant, createEditor } from "slate";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Toolbar } from "~/components/toolbar/Toolbar";

import { withShortcuts } from "~/lib/editor-plugins/withShortcuts";
import { HoverToolbar } from "~/components/toolbar/HoverToolbar";
import { withLinks } from "~/lib/editor-plugins/withLinks";
import { EditorElement } from "./elements/index";
import { Leaf } from "./Leaf";
import { handleEditorHotkeys } from "~/lib/editor/utils";
import { withVoids } from "~/lib/editor-plugins/withVoids";
import { decorate } from "~/lib/editor/syntax-highlight";

interface EditorProps {
  isReadonly?: boolean;
  value: any[];
  onChange?(value: Descendant[]): void;
}

export function Editor({ isReadonly, value, onChange }: EditorProps) {
  const renderElement = React.useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    [],
  );

  const renderLeaf = React.useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = React.useMemo(
    () => withVoids(withLinks(withShortcuts(withHistory(withReact(createEditor()))))),
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
          decorate={(entry) => decorate(entry, editor)}
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

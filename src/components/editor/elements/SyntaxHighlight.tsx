import React from "react";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useReadOnly, useSlateStatic } from "slate-react";

export function SyntaxHighlightElement({ attributes, element, children }: RenderElementProps) {
  const editor = useSlateStatic();
  const readOnly = useReadOnly();

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (readOnly) return;
    const path = ReactEditor.findPath(editor, element);

    Transforms.setNodes(editor, { language: event.target.value }, { at: path });
  }

  return (
    <span {...attributes} className="relative">
      <div contentEditable={false} className="absolute top-1.5 right-1.5">
        <select onChange={handleLanguageChange}>
          <option value={"html"}>html</option>
          <option value={"javascript"}>javascript</option>
          <option value={"python"}>python</option>
        </select>
      </div>

      <div className="font-mono bg-[hsla(0, 0%, 100%, .5)] flex flex-col">{children}</div>
    </span>
  );
}

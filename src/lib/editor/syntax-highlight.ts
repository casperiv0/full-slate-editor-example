import { NodeEntry, Editor as SlateEditor, Node } from "slate";
import Prism from "prismjs";
import { ElementType } from "~/components/editor/types";

import "prismjs/components/prism-python";
import "prismjs/components/prism-php";

export function decorate([node, path]: NodeEntry, editor: SlateEditor) {
  const ranges: any[] = [];

  const isCode = SlateEditor.isBlock(editor, node) && node.type === ElementType.SyntaxHighlight;
  if (!isCode) {
    return [];
  }

  const parent = { language: "html" };
  // const parent = Node.parent(node, path);
  // const isParentCodeBlock =
  //   SlateEditor.isBlock(editor, parent) && parent.type === ElementType.SyntaxHighlightBlock;

  // if (!isParentCodeBlock) {
  //   return [];
  // }

  const language = parent.language ?? "html";
  const text = node.children.map((v) => v.text).join(" ");

  const grammar = Prism.languages[language];
  if (!grammar) return [];

  const tokens = Prism.tokenize(text, grammar);

  let start = 0;

  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    if (typeof token !== "string") {
      ranges.push({
        [token.type]: true,
        anchor: { path, offset: start },
        focus: { path, offset: end },
      });
    }

    start = end;
  }

  return ranges;
}

function getLength(token: any): number {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  }

  return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
}

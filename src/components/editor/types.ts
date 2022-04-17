import type { Descendant, BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";
import type { HistoryEditor } from "slate-history";

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: SlateElements;
    Text: Text;
  }
}

export enum ElementType {
  Paragraph = "paragraph",
  H1 = "heading-one",
  H2 = "heading-two",
  H3 = "heading-three",
  Blockquote = "blockquote",
  ListItem = "list-item",
  BulletedList = "bulleted-list",
  NumberedList = "numbered-list",
  CheckListItem = "check-list-item",
  Link = "link",
  HorizontalLine = "horizontal-line",

  SyntaxHighlightBlock = "syntax-highlight-block",
  SyntaxHighlight = "syntax-highlight",
}

export interface Text {
  // syntax highlight
  selector?: boolean;
  symbol?: boolean;
  constant?: boolean;
  tag?: boolean;
  boolean?: boolean;
  number?: boolean;
  regex?: boolean;
  url?: boolean;
  comment?: boolean;
  operator?: boolean;
  keyword?: boolean;
  variable?: boolean;
  "attr-name"?: boolean;
  char?: boolean;
  function?: boolean;
  string?: boolean;
  punctuation?: boolean;
  "class-name"?: boolean;

  text: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  "inline-code"?: boolean;
}

export interface ParagraphElement {
  type: ElementType.Paragraph;
  align?: TextAlignment;
  children: Descendant[];
}

export interface HeadingOneElement {
  type: ElementType.H1;
  align?: TextAlignment;
  children: Text[];
}

export interface HeadingTwoElement {
  type: ElementType.H2;
  align?: TextAlignment;
  children: Text[];
}

export interface HeadingThreeElement {
  type: ElementType.H3;
  align?: TextAlignment;
  children: Text[];
}

export interface BlockquoteElement {
  type: ElementType.Blockquote;
  align?: TextAlignment;
  children: Text[];
}

export interface ListItemElement {
  type: ElementType.ListItem;
  children: Text[];
}

export interface BulletItemElement {
  type: ElementType.BulletedList;
  children: ListItemElement[];
}

export interface CheckListItemElement {
  type: ElementType.CheckListItem;
  checked?: boolean;
  children: ListItemElement[];
}

export interface NumberedListItemElement {
  type: ElementType.NumberedList;
  children: ListItemElement[];
}

export interface LinkElement {
  type: ElementType.Link;
  url?: string;
  children: Text[];
}

export interface SyntaxHighlightBlockElement {
  type: ElementType.SyntaxHighlightBlock;
  language?: string;
  children: SyntaxHighlightElement[];
}

export interface SyntaxHighlightElement {
  type: ElementType.SyntaxHighlight;
  children: Text[];
}

export interface HorizontalLineElement {
  type: ElementType.HorizontalLine;
  children: [{ text: "" }];
}

export type SlateElements =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | BlockquoteElement
  | ListItemElement
  | BulletItemElement
  | NumberedListItemElement
  | CheckListItemElement
  | LinkElement
  | HorizontalLineElement
  | SyntaxHighlightBlockElement
  | SyntaxHighlightElement;

export type TextAlignment = "text-left" | "text-right" | "text-center";
export type SlateFormat = SlateElements["type"] | TextAlignment;

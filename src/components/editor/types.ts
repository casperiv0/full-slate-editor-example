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
}

export interface Text {
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
  children: Text[];
}

export interface CheckListItemElement {
  type: ElementType.CheckListItem;
  checked?: boolean;
  children: Text[];
}

export interface NumberedListItemElement {
  type: ElementType.NumberedList;
  children: Text[];
}

export interface LinkElement {
  type: ElementType.Link;
  url?: string;
  children: Text[];
}

export interface HorizontalLineElement {
  type: ElementType.HorizontalLine;
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
  | HorizontalLineElement;

export type TextAlignment = "text-left" | "text-right" | "text-center";
export type SlateFormat = SlateElements["type"] | TextAlignment;

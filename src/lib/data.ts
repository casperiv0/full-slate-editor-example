import { Descendant } from "slate";
import { ElementType } from "~/components/editor/types";

export const SAMPLE_DATA: Descendant[] = [
  {
    type: ElementType.Paragraph,
    children: [
      {
        text: "Using ",
        bold: true,
      },
      {
        type: ElementType.Link,
        url: "https://slatejs.org",
        children: [
          {
            text: "Slate",
            bold: true,
          },
        ],
      },
      {
        text: " for this awesome editor!",
        bold: true,
      },
    ],
  },
  {
    type: ElementType.Paragraph,
    children: [
      {
        text: "Links are clickable in ",
        italic: true,
      },
      {
        text: "readOnly",
        "inline-code": true,
        italic: true,
      },
    ],
  },
  {
    type: ElementType.Paragraph,
    children: [{ text: "" }],
  },
  {
    type: ElementType.H2,
    children: [
      {
        text: "Features",
      },
    ],
  },
  {
    type: ElementType.BulletedList,
    children: [
      {
        type: ElementType.ListItem,
        children: [
          {
            text: "Block formatting",
          },
        ],
      },
      {
        type: ElementType.ListItem,
        children: [
          {
            text: "Text formatting",
          },
        ],
      },
      {
        type: ElementType.ListItem,
        children: [
          {
            text: "Text alignment",
          },
        ],
      },
      {
        type: ElementType.ListItem,
        children: [
          {
            text: "Shortcuts (###, >, -, [], etc.)",
          },
        ],
      },
      {
        type: ElementType.ListItem,
        children: [
          {
            text: "Keyboard combos",
          },
        ],
      },
    ],
  },
  {
    type: ElementType.HorizontalLine,
    children: [{ text: "" }],
  },
  {
    type: ElementType.SyntaxHighlightBlock,
    language: "html",
    children: [
      {
        type: ElementType.SyntaxHighlight,
        children: [{ text: "<p>Event has code syntax highlighting!</p>" }],
      },
      {
        type: ElementType.SyntaxHighlight,
        children: [{ text: "<p>Multi line support for syntax highlight</p>" }],
      },
    ],
  },
];

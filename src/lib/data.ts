export const SAMPLE_DATA = [
  {
    type: "paragraph",
    children: [
      {
        text: "Using ",
        bold: true,
      },
      {
        type: "link",
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
    type: "paragraph",
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
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "heading-two",
    children: [
      {
        text: "Features",
      },
    ],
  },
  {
    type: "bulleted-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "Block formatting",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Text formatting",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Text alignment",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Shortcuts (###, >, -, [], etc.)",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Keyboard combos",
          },
        ],
      },
    ],
  },
];

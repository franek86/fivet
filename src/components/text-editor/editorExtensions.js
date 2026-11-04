import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

import { Node, mergeAttributes } from "@tiptap/core";

export const Column = Node.create({
  name: "column",
  content: "block+",
  isolating: true,
  parseHTML: () => [{ tag: 'div[data-type="column"]' }],
  renderHTML: ({ HTMLAttributes }) => ["div", mergeAttributes(HTMLAttributes, { "data-type": "column" }), 0],
});

export const Columns = Node.create({
  name: "columns",
  group: "block",
  content: "column{2,3}",
  isolating: true,
  addAttributes() {
    return {
      count: {
        default: 2,
        parseHTML: (el) => Number(el.getAttribute("data-count")) || 2,
        renderHTML: (attrs) => ({ "data-count": attrs.count }),
      },
    };
  },
  parseHTML: () => [{ tag: 'div[data-type="columns"]' }],
  renderHTML: ({ HTMLAttributes }) => ["div", mergeAttributes(HTMLAttributes, { "data-type": "columns" }), 0],
  addCommands() {
    return {
      setColumns:
        (count = 2) =>
        ({ commands }) =>
          commands.insertContent({
            type: "columns",
            attrs: { count },
            content: Array.from({ length: count }, () => ({
              type: "column",
              content: [{ type: "paragraph" }],
            })),
          }),
    };
  },
});

export const editorExtensions = [
  StarterKit.configure({
    bulletList: { HTMLAttributes: { class: "list-disc" } },
    orderedList: { HTMLAttributes: { class: "list-decimal" } },
    link: {
      openOnClick: false,
      HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
    },
  }),
  Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Image,
  Columns,
  Column,
];

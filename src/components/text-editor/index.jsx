import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBarEditor from "./MenuBarEditor.jsx";
import { useEffect } from "react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

const TextEditor = ({ content, onChange, editable }) => {
  const isEditable = editable ?? true;

  const editor = useEditor({
    editable: isEditable,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal" },
        },
      }),
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: "",
    editorProps: {
      attributes: {
        class: isEditable ? "text-editor-custom" : undefined,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
    immediatelyRender: false,
  });

  // Update editor when content prop changes
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (editor.getHTML() === content) return;
    editor.commands.setContent(content || "", false);
    /* if (content !== editor.getHTML()) {
      editor.commands.setContent(content);
    } */
  }, [content, editor]);

  return (
    <div>
      {isEditable && <MenuBarEditor editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;

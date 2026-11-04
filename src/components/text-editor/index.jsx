import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import MenuBarEditor from "./MenuBarEditor.jsx";
import { editorExtensions } from "./editorExtensions.js";

const TextEditor = ({ content, onChange, editable }) => {
  const isEditable = editable ?? true;

  const editor = useEditor({
    editable: isEditable,
    extensions: editorExtensions,
    content: content || "",
    editorProps: {
      attributes: {
        class: isEditable ? "text-editor-custom" : undefined,
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Update editor when content prop changes
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (editor.getHTML() === content) return;
    editor.commands.setContent(content || "", false);
  }, [content, editor]);

  return (
    <div>
      {isEditable && <MenuBarEditor editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;

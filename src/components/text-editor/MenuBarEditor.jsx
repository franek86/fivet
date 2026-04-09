import { useMemo } from "react";
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Heading,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import styled from "styled-components";
import ToggleMenuEditorIcon from "./ToggleMenuEditorIcon.jsx";

const MenuEditorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--color-grey-0);
  z-index: 50;
  cursor: pointer;
`;

const MenuBarEditor = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const Options = useMemo(
    () => [
      {
        icon: <Heading size={20} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
        canRun: editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        icon: <Heading2 size={20} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
        canRun: editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        icon: <Heading3 size={20} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        active: editor.isActive("heading", { level: 3 }),
        canRun: editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
      },
      {
        icon: <Bold size={20} />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
        canRun: editor.can().chain().focus().toggleBold().run(),
      },
      {
        icon: <Italic size={20} />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
        canRun: editor.can().chain().focus().toggleItalic().run(),
      },
      {
        icon: <Strikethrough size={20} />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        active: editor.isActive("strike"),
        canRun: editor.can().chain().focus().toggleStrike().run(),
      },
      {
        icon: <AlignLeft size={20} />,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        active: editor.isActive({ textAlign: "left" }),
        canRun: true,
      },
      {
        icon: <AlignCenter size={20} />,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        active: editor.isActive({ textAlign: "center" }),
        canRun: true,
      },
      {
        icon: <List size={20} />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        active: editor.isActive("bulletList"),
        canRun: editor.can().chain().focus().toggleBulletList().run(),
      },
      {
        icon: <ListOrdered size={20} />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        active: editor.isActive("orderedList"),
        canRun: editor.can().chain().focus().toggleOrderedList().run(),
      },
      {
        icon: <Highlighter size={20} />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        active: editor.isActive("highlight"),
      },
    ],
    [editor],
  );

  return (
    <MenuEditorWrapper>
      {Options.map((option, index) => (
        <ToggleMenuEditorIcon key={index} pressed={option.active} disabled={!option.canRun} onPressedChange={option.onClick}>
          {option.icon}
        </ToggleMenuEditorIcon>
      ))}
    </MenuEditorWrapper>
  );
};

export default MenuBarEditor;

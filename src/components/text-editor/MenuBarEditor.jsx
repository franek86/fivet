import { useRef } from "react";
import { useEditorState } from "@tiptap/react";

import {
  AlignCenter,
  AlignLeft,
  Bold,
  Columns2,
  Columns3,
  Heading,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

import styled from "styled-components";
import ToggleMenuEditorIcon from "./ToggleMenuEditorIcon.jsx";
import apiClient from "../../services/axiosConfig.js";

const MenuBarEditor = ({ editor }) => {
  const fileRef = useRef(null);

  const active =
    useEditorState({
      editor,
      selector: ({ editor }) => {
        if (!editor) return null;
        return {
          h1: editor.isActive("heading", { level: 1 }),
          h2: editor.isActive("heading", { level: 2 }),
          h3: editor.isActive("heading", { level: 3 }),
          bold: editor.isActive("bold"),
          italic: editor.isActive("italic"),
          strike: editor.isActive("strike"),
          left: editor.isActive({ textAlign: "left" }),
          center: editor.isActive({ textAlign: "center" }),
          bullet: editor.isActive("bulletList"),
          ordered: editor.isActive("orderedList"),
          highlight: editor.isActive("highlight"),
          link: editor.isActive("link"),
          columns: editor.isActive("columns"),
        };
      },
    }) ?? {};

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!/^(https?:\/\/|mailto:)/i.test(url)) {
      window.alert("Link mora počinjati s http://, https:// ili mailto:");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const onPickImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    /*  const alt = window.prompt("Opis slike (alt tekst)");
    if (!alt?.trim()) return; */

    const fd = new FormData();
    fd.append("image", file);

    try {
      const { data } = await apiClient.post("/posts/uploads/image", fd, { headers: { "Content-Type": "multipart/form-data" } });

      editor.chain().focus().setImage({ src: data.url, alt: alt.trim() }).run();
    } catch {
      console.log("Faild upload image");
    }
  };

  const chain = () => editor.chain().focus();

  const options = [
    { label: "Heading 1", icon: <Heading size={20} />, run: () => chain().toggleHeading({ level: 1 }).run(), on: active.h1 },
    { label: "Heading 2", icon: <Heading2 size={20} />, run: () => chain().toggleHeading({ level: 2 }).run(), on: active.h2 },
    { label: "Heading 3", icon: <Heading3 size={20} />, run: () => chain().toggleHeading({ level: 3 }).run(), on: active.h3 },
    { label: "Bold", icon: <Bold size={20} />, run: () => chain().toggleBold().run(), on: active.bold },
    { label: "Italic", icon: <Italic size={20} />, run: () => chain().toggleItalic().run(), on: active.italic },
    { label: "Strikethrough", icon: <Strikethrough size={20} />, run: () => chain().toggleStrike().run(), on: active.strike },
    { label: "Align left", icon: <AlignLeft size={20} />, run: () => chain().setTextAlign("left").run(), on: active.left },
    { label: "Align center", icon: <AlignCenter size={20} />, run: () => chain().setTextAlign("center").run(), on: active.center },
    { label: "Order list", icon: <List size={20} />, run: () => chain().toggleBulletList().run(), on: active.bullet },
    { label: "Numeric list", icon: <ListOrdered size={20} />, run: () => chain().toggleOrderedList().run(), on: active.ordered },
    { label: "Highlight", icon: <Highlighter size={20} />, run: () => chain().toggleHighlight().run(), on: active.highlight },
    { label: "Link", icon: <Link2 size={20} />, run: setLink, on: active.link },
    { label: "Image", icon: <ImagePlus size={20} />, run: () => fileRef.current?.click(), on: false },
    { label: "2 columns", icon: <Columns2 size={20} />, run: () => chain().setColumns(2).run(), on: false },
    { label: "3 columns", icon: <Columns3 size={20} />, run: () => chain().setColumns(3).run(), on: false },
  ];

  return (
    <MenuEditorWrapper>
      {options.map((o) => (
        <ToggleMenuEditorIcon key={o.label} aria-label={o.label} pressed={Boolean(o.on)} onPressedChange={o.run}>
          {o.icon}
        </ToggleMenuEditorIcon>
      ))}
      <input ref={fileRef} type='file' accept='image/*' hidden onChange={onPickImage} />
    </MenuEditorWrapper>
  );
};

export default MenuBarEditor;

const MenuEditorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--color-white);
  z-index: 50;
`;

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styled, { createGlobalStyle, keyframes } from "styled-components";

import { useGetBlog, useUpdateBlog } from "../../hooks/useBlog.js";

import Spinner from "../Spinner.jsx";
import BackBtn from "../BackBtn.jsx";
import UploadImageBlock from "./UploadImageBlock.jsx";
import SortableBlocks from "./blog-dnd/SortableBlocks.jsx";
import AddBlockDropdown from "./blog-dnd/AddBlockDropdown.jsx";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: .4; }
`;

/* ─────────────────────────────────────────────
   Layout
───────────────────────────────────────────── */
const EditorShell = styled.div`
  display: grid;
  grid-template-columns: 1fr 260px;
  grid-template-rows: 56px 1fr;
  background: var(--color-white);
  color: var(--color-text);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

/* ── Top bar ── */
const TopBar = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TopBarTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text);
  flex: 1;
`;

const SaveBtn = styled.button`
  padding: 7px 20px;
  border-radius: 8px;
  border: none;
  background: var(--color-accent);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    transform 0.1s;
  &:hover {
    background: var(--color-accent-600);
  }
  &:active {
    transform: scale(0.97);
  }
  &:disabled {
    background: var(--color-accent);
    cursor: not-allowed;
  }
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${(p) => (p.$dirty ? "var(--color-danger)" : "var(--color-success)")};
  animation: ${(p) => (p.$saving ? pulse : "none")} 1s infinite;
  flex-shrink: 0;
`;

/* ── Main canvas ── */
const Canvas = styled.main`
  overflow-y: auto;
  padding: 40px 60px 120px;

  @media (max-width: 900px) {
    padding: 24px 20px 80px;
  }
`;

/* ── Sidebar ── */
const Sidebar = styled.aside`
  border-left: 1px solid var(--color-border);
  background: var(--color-white);
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SideLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
`;

const SideInput = styled.input`
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 13px;
  color: var(--color-text);
  background: var(--color-white);
  outline: none;
  transition: border-color 0.15s;
  &:focus {
    border-color: var(--color-border);
    background: var(--color-white);
  }
`;

const SideTextarea = styled.textarea`
  padding: 8px 10px;
  border: 1px solid var(--color-text);
  border-radius: 8px;
  font-size: 13px;
  color: var(--color-text);
  background: var(--color-border);
  outline: none;
  resize: vertical;
  min-height: 72px;
  transition: border-color 0.15s;
  &:focus {
    border-color: var(--color-border);
    background: var(--color-white);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0;
`;

/* ─────────────────────────────────────────────
   Post header fields (title / description)
───────────────────────────────────────────── */
const TitleInput = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--color-text);
  overflow: hidden;
  field-sizing: content; /* auto-grow */
  &::placeholder {
    color: var(--color-text);
  }
`;

const DescInput = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 18px;
  color: var(--color-text);
  line-height: 1.6;
  field-sizing: content;
  &::placeholder {
    color: var(--color-text);
  }
`;

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const EditBlogForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBlog(slug);
  const blogId = data?.id;
  const { mutate: updateBlog, isLoading: isSaving } = useUpdateBlog();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      slug: "",
      author: "",
      tags: "",
      bannerImage: null,
      bannerImageAlt: "",
      blocks: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "blocks" });

  // SortableBlocks mounts before reset() runs.
  const [isSeeded, setIsSeeded] = useState(false);

  /* seed form once data arrives */
  useEffect(() => {
    if (!data) return;
    const sorted = [...(data.blocks || [])].sort((a, b) => a.order - b.order);
    reset({
      title: data.title ?? "",
      slug: data.slug ?? "",
      shortDescription: data.shortDescription ?? "",
      author: data.author ?? "",
      tags: (data.tags || []).join(", "),
      bannerImage: data.bannerImage ?? null, // existing URL string
      bannerImageAlt: data.bannerImageAlt ?? "",
      blocks: sorted,
    });
    setIsSeeded(true);
  }, [data, reset]);

  /* save */
  const onSubmit = async (values) => {
    const form = new FormData();
    form.append("title", values.title);
    form.append("shortDescription", values.shortDescription);
    form.append("author", values.author);
    form.append("tags", values.tags);
    form.append("bannerImageAlt", values.bannerImageAlt);

    // bannerImage is a File when the user picked a new one, or a URL string when unchanged
    if (values.bannerImage instanceof File) {
      form.append("bannerImage", values.bannerImage);
    }

    // blocks: strip File objects out, send them separately
    const blocksPayload = values?.blocks?.map(({ _file, ...rest }, i) => ({
      ...rest,
      order: i,
    }));
    form.append("blocks", JSON.stringify(blocksPayload));

    values?.blocks?.forEach((b) => {
      if (b._file instanceof File) {
        form.append(`block_image_${b.id}`, b._file);
      }
    });

    await updateBlog({ id: blogId, form });
  };

  const title = watch("title");
  const bannerImageValue = watch("bannerImage");

  if (isLoading) return <Spinner />;

  return (
    <EditorShell>
      {/* ── Top bar ── */}
      <TopBar>
        <BackBtn />
        <TopBarTitle>{title || "Untitled post"} — Edit</TopBarTitle>
        <StatusDot $dirty={isDirty} $saving={isSaving} title={isSaving ? "Saving…" : isDirty ? "Unsaved changes" : "Saved"} />
        <SaveBtn onClick={onSubmit} disabled={isSaving || !isDirty}>
          {isSaving ? "Saving…" : "Save"}
        </SaveBtn>
      </TopBar>

      {/* ── Canvas ── */}
      <Canvas>
        {/* Title */}
        <TitleInput placeholder='Post title…' rows={1} {...register("title")} />
        {/* Short description */}
        <DescInput placeholder='Short description…' rows={2} style={{ marginBottom: 32 }} {...register("shortDescription")} />
        {/* Banner */}
        <UploadImageBlock
          initialPreview={
            bannerImageValue instanceof File ? URL.createObjectURL(bannerImageValue) : bannerImageValue // existing URL string
          }
          onChange={(file) => setValue("bannerImage", file, { shouldDirty: true })}
        />
        {/* Blocks — identical to create form */}
        <Column>
          {isSeeded ? (
            <>
              <SortableBlocks fields={fields} register={register} control={control} remove={remove} move={move} append={append} />
              <AddBlockDropdown append={append} />
            </>
          ) : (
            <Spinner />
          )}
        </Column>
      </Canvas>

      {/* ── Sidebar ── */}
      <Sidebar>
        <SideSection>
          <SideLabel htmlFor='edit-author'>Slug</SideLabel>
          <SideInput id='edit-author' placeholder='Slug' {...register("slug")} />
        </SideSection>
        <Divider />
        <SideSection>
          <SideLabel htmlFor='edit-author'>Author</SideLabel>
          <SideInput id='edit-author' placeholder='Author name' {...register("author")} />
        </SideSection>

        <Divider />

        <SideSection>
          <SideLabel htmlFor='edit-tags'>Tags</SideLabel>
          <SideInput id='edit-tags' placeholder='react, typescript, …' {...register("tags")} />
          <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#aaa" }}>Comma-separated</span>
        </SideSection>

        <Divider />

        <SideSection>
          <SideLabel htmlFor='edit-banner-alt'>Banner alt text</SideLabel>
          <SideInput id='edit-banner-alt' placeholder='Describe the banner image' {...register("bannerImageAlt")} />
        </SideSection>

        <Divider />

        <SideSection>
          <SideLabel>Blocks</SideLabel>
          <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#666" }}>
            {fields.length} block{fields.length !== 1 ? "s" : ""} total
          </span>
          {fields.map((f, i) => (
            <div
              key={f.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 8px",
                borderRadius: 7,
                background: "#f6f6f5",
                fontFamily: "system-ui",
                fontSize: 12,
                color: "#555",
              }}
            >
              <span>{f.type === "text" ? "¶" : "🖼️"}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {f.type === "text" ? f.text?.replace(/<[^>]+>/g, "").slice(0, 30) || "Empty text block" : f.imageAlt || "Image block"}
              </span>
              <span style={{ color: "#bbb" }}>#{i + 1}</span>
            </div>
          ))}
        </SideSection>
      </Sidebar>
    </EditorShell>
  );
};

export default EditBlogForm;

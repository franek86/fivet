import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled, { createGlobalStyle, keyframes } from "styled-components";

import { useGetBlog, useUpdateBlog } from "../../hooks/useBlog.js";

import CustomSelect from "../ui/CustomSelect.jsx";
import Spinner from "../Spinner.jsx";
import BackBtn from "../BackBtn.jsx";
import UploadImageBlock from "./UploadImageBlock.jsx";
import SortableBlocks from "./blog-dnd/SortableBlocks.jsx";
import AddBlockDropdown from "./blog-dnd/AddBlockDropdown.jsx";
import { editBlogSchema } from "../../utils/validationSchema.js";
import { useGetBlogCategories } from "../../hooks/useBlogCategory.js";
import Accordion from "../ui/Accordion.jsx";
import BlogSeoBlock from "./BlogSeoBlock.jsx";
import MultipleImagesUploader from "../MultipleImagesUploader.jsx";

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
  margin-bottom: 32px;
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
  const { data: categories } = useGetBlogCategories();
  const blogId = data?.id;
  const { mutate: updateBlog, isFetching: isSaving } = useUpdateBlog();

  const [existingImages, setExistingImages] = useState(data?.gallery);
  const [newImages, setNewImages] = useState([]);
  const [deleteImageIds, setDeleteImageIds] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      slug: "",
      author: "",
      tags: "",
      categoryId: "",
      bannerImage: null,
      bannerImageAlt: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      blocks: [],
      gallery: [],
    },
    resolver: zodResolver(editBlogSchema),
  });

  console.log(isDirty);

  /* Get blog categores and map it  */
  const blogCategories = categories?.map((cat) => {
    return {
      value: cat.id,
      name: cat.title,
    };
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "blocks" });

  // SortableBlocks mounts before reset() runs.
  const [isSeeded, setIsSeeded] = useState(false);

  /* seed form once data arrives */
  useEffect(() => {
    if (!data || isSeeded) return;
    const sorted = [...(data.blocks || [])].sort((a, b) => a.order - b.order);

    reset({
      title: data.title ?? "",
      slug: data.slug ?? "",
      shortDescription: data.shortDescription ?? "",
      author: data.author ?? "",
      categoryId: data.categoryId ?? "",
      tags: (data.tags || []).join(", "),
      bannerImage: data.bannerImage ?? null,
      bannerImageAlt: data.bannerImageAlt ?? "",
      metaTitle: data.metaTitle ?? "",
      metaKeywords: data.metaKeywords ?? "",
      metaDescription: data.metaDescription ?? "",
      blocks: sorted,
      gallery: data.gallery ?? [],
    });
    setIsSeeded(true);
  }, [data, reset, isSeeded]);

  /* save */
  const onSubmit = async (values) => {
    const form = new FormData();
    form.append("title", values.title);
    form.append("shortDescription", values.shortDescription);
    form.append("author", values.author);
    form.append("categoryId", values.categoryId);
    form.append("metaTitle", values.metaTitle);
    form.append("metaDescroption", values.metaDescroption);
    form.append("metaKeywords", values.metaKeywords);

    form.append("bannerImageAlt", values.bannerImageAlt);

    //tags
    const tagsArray = values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    tagsArray.forEach((tag) => form.append("tags", tag));

    // bannerImage is a File when the user picked a new one, or a URL string when unchanged
    if (values.bannerImage instanceof File) {
      form.append("bannerImage", values.bannerImage);
    }

    // blocks
    const blocksPayload = values.blocks.map((block, i) => ({
      text: block.text,
      imageAlt: block.imageAlt,
      order: i,
    }));

    form.append("blocks", JSON.stringify(blocksPayload));

    values.blocks.forEach((block) => {
      if (block.imageUrl instanceof File) {
        form.append("blockImages", block.imageUrl);
      }
    });

    /*---------- Blog Gallery -----------*/

    /* New images in gallery */
    newImages.forEach((img) => {
      form.append("gallery", img.file);
    });

    /* New image alt text */
    const newImagesMeta = newImages.map((img) => ({
      alt: img.alt || "",
    }));

    /* Append new image meta text*/
    form.append("imagesMeta", JSON.stringify(newImagesMeta));

    /* handle existing images in gallery */

    /* Existing image alt text in gallery */
    const existingImagesMeta = existingImages?.map((img) => ({
      id: img.id,
      alt: img.alt || "",
    }));

    /* Append existing image in gallery meta text*/
    form.append("existingImagesMeta", JSON.stringify(existingImagesMeta));

    // deleteImageIds = ["publicId1", "publicId2"]
    if (deleteImageIds && deleteImageIds.length > 0) {
      form.append("deleteImageIds", JSON.stringify(deleteImageIds));
    }

    await updateBlog({ id: blogId, form });
  };

  const title = watch("title");
  const bannerImageValue = watch("bannerImage");

  if (isSaving) return <Spinner />;

  return (
    <EditorShell>
      {/* ── Top bar ── */}
      <TopBar>
        <BackBtn />
        <TopBarTitle>{title || "Untitled post"} — Edit</TopBarTitle>
        <StatusDot $dirty={isDirty} $saving={isSaving} title={isSaving ? "Saving…" : isDirty ? "Unsaved changes" : "Saved"} />
        <SaveBtn onClick={handleSubmit(onSubmit)} disabled={isSaving}>
          {isSaving ? "Saving…" : "Save"}
        </SaveBtn>
      </TopBar>

      {/* ── Canvas ── */}
      <Canvas>
        {/* Title */}
        <TitleInput placeholder='Post title…' rows={1} {...register("title")} />
        {/* Short description */}
        <DescInput placeholder='Short description…' {...register("shortDescription")} />
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
              <SortableBlocks
                isSeeded={isSeeded}
                fields={fields}
                register={register}
                control={control}
                remove={remove}
                move={move}
                append={append}
              />
              <AddBlockDropdown append={append} />
            </>
          ) : (
            <Spinner />
          )}
        </Column>

        <Accordion title='Gallery section'>
          <MultipleImagesUploader
            name='gallery'
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            onNewImagesChange={setNewImages}
            newImages={newImages}
            deleteImageIds={deleteImageIds}
            onDeleteImageIdsChange={setDeleteImageIds}
          />
        </Accordion>

        <Accordion title='SEO section'>
          <BlogSeoBlock register={register} />
        </Accordion>
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
          <Controller
            name='categoryId'
            control={control}
            render={({ fields }) => (
              <CustomSelect
                {...fields}
                control={control}
                options={blogCategories}
                placeholder='Select categories'
                label='Categories'
                size='medium'
                variation='transparent'
                valueKey='value'
                {...register("categoryId")}
              />
            )}
          />
        </SideSection>

        <Divider />

        <SideSection>
          <SideLabel htmlFor='edit-tags'>Tags</SideLabel>
          <SideInput id='edit-tags' placeholder='react, typescript, …' {...register("tags")} />
          <span style={{ fontSize: 11, color: "#aaa" }}>Comma-separated</span>
        </SideSection>

        <Divider />

        <SideSection>
          <SideLabel htmlFor='edit-banner-alt'>Banner alt text</SideLabel>
          <SideInput placeholder='Describe the banner image' {...register("bannerImageAlt")} />
        </SideSection>

        <Divider />

        <SideSection>
          <SideLabel>Blocks</SideLabel>
          <span style={{ fontSize: 12, color: "#666" }}>
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

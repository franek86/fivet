import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

import { useGetBlog, useUpdateBlog } from "../../hooks/useBlog.js";

import CustomSelect from "../ui/CustomSelect.jsx";

import BlogSeoBlock from "./blog-form/BlogSeoBlock.jsx";
import MultipleImagesUploader from "../MultipleImagesUploader.jsx";
import TextEditor from "../text-editor/index.jsx";
import ImageUploader from "../ImageUploader.jsx";

import BackBtn from "../BackBtn.jsx";
import Spinner from "../Spinner.jsx";

import { editBlogSchema } from "../../utils/validationSchema.js";
import { useGetBlogCategories } from "../../hooks/useBlogCategory.js";
import { BLOG_STATUS } from "../../constants/index.js";
import BlogTags from "./blog-form/BlogTags.jsx";

const EditBlogForm = () => {
  const { slug } = useParams();
  const { data } = useGetBlog(slug);
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      slug: "",
      shortDescription: "",
      status: "",
      content: "",
      categoryId: "",
      tags: [],
      bannerImage: data?.bannerImage ?? null,
      bannerImageAlt: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: data?.metaDescription ?? "",
      gallery: [],
    },
  });

  /* Get blog categores and map it  */
  const blogCategories = categories?.map((cat) => {
    return {
      value: cat.id,
      name: cat.title,
    };
  });

  useEffect(() => {
    if (!data) return;
    reset({
      title: data?.title ?? "",
      subTitle: data?.subTitle ?? "",
      slug: data?.slug ?? "",
      status: data?.status ?? "",
      shortDescription: data?.shortDescription ?? "",
      content: data?.content ?? "",
      categoryId: data?.categoryId ?? "",
      tags: data?.tags || [],
      bannerImage: data?.bannerImage ?? null,
      bannerImageAlt: data?.bannerImageAlt ?? "",
      metaTitle: data?.metaTitle ?? "",
      metaKeywords: data.metaKeywords?.join(", ") ?? "",
      metaDescription: data?.metaDescription ?? "",
      gallery: data?.gallery ?? [],
    });
    setExistingImages(data.gallery ?? []);
  }, [data, reset]);

  /* save */
  const onSubmit = async (values) => {
    const form = new FormData();

    //Basic fields
    form.append("title", values.title);
    form.append("slug", values.slug);
    form.append("shortDescription", values.shortDescription);
    form.append("subTitle", values.subTitle);
    form.append("content", values.content || "");

    //Banner image
    if (values.bannerImage instanceof File) {
      formData.append("bannerImage", values.bannerImage);
    }
    form.append("bannerImageAlt", values.bannerImageAlt);

    //SEO
    form.append("metaTitle", values.metaTitle);
    form.append("metaDescroption", values.metaDescroption);

    const keywordsArray =
      values.metaKeywords
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) || [];
    keywordsArray.forEach((keyword) => {
      form.append("metaKeywords", keyword);
    });

    //Tags
    /* const tagsArray = values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    tagsArray.forEach((tag) => form.append("tags", tag)); */
    values.tags.forEach((tag) => {
      form.append("tags", tag);
    });

    //Categories
    form.append("categoryId", String(values.categoryId));

    //Status
    form.append("status", values.status);

    // Existing gallery images
    const existingImagesMeta = existingImages.map((image, index) => ({
      id: image.id,
      url: image.url,
      publicId: image.publicId,
      alt: image.alt || "",
      order: index,
    }));

    // New gallery images
    const galleryMeta = newImages.map((image, index) => ({
      alt: image.alt || "",
      order: existingImages.length + index,
    }));

    newImages.forEach((image) => {
      form.append("gallery", image.file);
    });

    form.append("existingImagesMeta", JSON.stringify(existingImagesMeta));

    form.append("galleryMeta", JSON.stringify(galleryMeta));

    // Deleted existing images
    form.append("deleteImageIds", JSON.stringify(deleteImageIds));

    await updateBlog({ id: blogId, form });
  };

  const title = watch("title");

  console.log(errors);

  if (isSaving) return <Spinner />;

  return (
    <>
      <TopBar>
        <BackBtn />
        <TopBarTitle>{title || "Untitled post"} — Edit</TopBarTitle>
      </TopBar>
      <EditorShell>
        <Canvas>
          <Section>
            <TitleInput placeholder='Blog title' {...register("title")} />
            <TransparentInput id='edit-slug' placeholder='Slug' {...register("slug")} />
            <TransparentInput id='edit-subtitle' placeholder='Subtitle' {...register("subTitle")} />
            <DescInput placeholder='Short description' {...register("shortDescription")} />
          </Section>

          <Section>
            <Controller
              name='content'
              control={control}
              render={({ field }) => <TextEditor content={field.value ?? ""} onChange={field.onChange} />}
            />
          </Section>

          <Section>
            <MultipleImagesUploader
              name='gallery'
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              onNewImagesChange={setNewImages}
              newImages={newImages}
              deleteImageIds={deleteImageIds}
              onDeleteImageIdsChange={setDeleteImageIds}
            />
          </Section>
        </Canvas>

        <Sidebar>
          <SaveBtn onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </SaveBtn>
          <Section>
            <Field>
              <Controller
                name='status'
                control={control}
                render={({ fields }) => (
                  <CustomSelect
                    {...fields}
                    control={control}
                    options={BLOG_STATUS}
                    placeholder='Select blog status'
                    label='Blog status'
                    size='medium'
                    variation='transparent'
                    valueKey='value'
                    {...register("status")}
                  />
                )}
              />
            </Field>

            <Field>
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
            </Field>

            <Field>
              <SideLabel htmlFor='edit-tags'>Tags</SideLabel>
              <Controller
                control={control}
                name='tags'
                render={({ field }) => (
                  <BlogTags
                    id='tags'
                    value={field.value}
                    onChange={field.onChange}
                    max={15}
                    invalid={!!errors.tags}
                    placeholder='Write tag and hit Enter'
                  />
                )}
              />
            </Field>
          </Section>

          <Section>
            <Field>
              <ImageUploader name='bannerImage' initialImage={watch("bannerImage")} onChange={(file) => setValue("bannerImage", file)} />
            </Field>
            <Field>
              <SideLabel htmlFor='edit-banner-alt'>Banner alt text</SideLabel>
              <SideInput placeholder='Describe the banner image' {...register("bannerImageAlt")} />
            </Field>
          </Section>

          <Section>
            <BlogSeoBlock register={register} />
          </Section>
        </Sidebar>
      </EditorShell>
    </>
  );
};

export default EditBlogForm;

/* ─────────────────────────────────────────────
   Layout
───────────────────────────────────────────── */
const EditorShell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 1.8rem;
  align-items: start;
  color: var(--color-text);

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Section = styled.section`
  border-bottom: 1px solid var(--color-border);
  padding: 2.4rem;
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
  position: sticky;
  top: 0;
  z-index: 100;
  margin-bottom: 2rem;
`;

const TopBarTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text);
  flex: 1;
`;

const SaveBtn = styled.button`
  margin: 2rem;
  padding: 1.2rem 2.2rem;
  border-radius: 8px;
  border: none;
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 1.4rem;
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

/* ── Main canvas ── */
const Canvas = styled.main`
  overflow-y: auto;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
`;

/* ── Sidebar ── */
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  overflow-y: auto;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 2rem;
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

/* const SideTextarea = styled.textarea`
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
`; */

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0;
`;

/* ─────────────────────────────────────────────
   Post header fields (title / description)
───────────────────────────────────────────── */

const TransparentInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 1.8rem;
  padding: 2rem;
  color: var(--color-text);
  overflow: hidden;
  field-sizing: content;
  &::placeholder {
    color: var(--color-text);
  }
`;

const TitleInput = styled(TransparentInput)`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const DescInput = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 1.8rem;
  padding: 2rem;
  color: var(--color-text);
  line-height: 1.6;
  field-sizing: content;
  &::placeholder {
    color: var(--color-text);
  }
`;

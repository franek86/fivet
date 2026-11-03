/**
 * React & Hooks
 */
import { useEffect, useRef, useState } from "react";

/**
 * Third-party libraries
 */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

/**
 * Validation Schema - Zod schema used to validate the blog form structure.
 */
import { blogSchema } from "../../utils/validationSchema.js";

/**
 * Constants - Static values used for blog categories and publishing status.
 */
import { BLOG_STATUS } from "../../constants/index.js";
import { useCreateBlog } from "../../hooks/useBlog.js";
import { useGetBlogCategories } from "../../hooks/useBlogCategory.js";

/**
 * UI Components
 */
import BlogSeoBlock from "./blog-form/BlogSeoBlock.jsx";
import BlogTags from "./blog-form/BlogTags.jsx";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import ImageUploader from "../ImageUploader.jsx";
import MultipleImagesUploader from "../MultipleImagesUploader.jsx";
import TextArea from "../ui/TextArea.jsx";
import TextEditor from "../text-editor/index.jsx";

import Spinner from "../Spinner.jsx";
import Title from "../ui/Title.jsx";
import Label from "../ui/Label.jsx";

const defaultValues = {
  title: "",
  slug: "",
  subTitle: "",
  shortDescription: "",
  content: "",
  bannerImage: null,
  bannerImageAlt: "",
  categoryId: [],
  status: BLOG_STATUS[0]?.value ?? "",
  tags: [],
  metaDescription: "",
  metaTitle: "",
  metaKeywords: "",
  gallery: [],
};

const slugify = (value = "") => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const CreateBlog = () => {
  const btnRef = useRef(null);

  const [isFixed, setIsFixed] = useState(false);

  const { mutate, isPending } = useCreateBlog();
  const { data: categories } = useGetBlogCategories();

  // Blog categories
  const blogCategoryData = categories?.map((cat) => {
    return {
      value: cat.id,
      name: cat.title,
    };
  });

  //Gallery state
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteImageIds, setDeleteImageIds] = useState([]);

  /* Move button edit to bottom on scroll */
  useEffect(() => {
    const element = btnRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsFixed(!entry.isIntersecting);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* RFH */
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultValues,
  });

  const blogTitleWatch = watch("title", "");

  // Automatically generate a URL-friendly slug whenever the blog title changes.
  useEffect(() => {
    setValue("slug", slugify(blogTitleWatch));
  }, [blogTitleWatch, setValue]);

  // Build form data
  const buildFormData = (data) => {
    const formData = new FormData();

    //Basic fields
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("subTitle", data.subTitle || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("content", data.content || "");

    //Banner image
    if (data.bannerImage instanceof File) {
      formData.append("bannerImage", data.bannerImage);
    }
    formData.append("bannerImageAlt", data.bannerImageAlt || "");

    //Seo
    formData.append("metaDescription", data.metaDescription || "");
    formData.append("metaTitle", data.metaTitle || "");
    formData.append("metaKeywords", data.metaKeywords || "");

    //Tags
    const tagsArray = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    tagsArray.forEach((tag) => formData.append("tags", tag));

    //Categories
    formData.append("categoryId", String(data.categoryId));

    //Status
    formData.append("status", data.status);

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
      formData.append("gallery", image.file);
    });

    formData.append("existingImagesMeta", JSON.stringify(existingImagesMeta));

    formData.append("galleryMeta", JSON.stringify(galleryMeta));

    // Deleted existing images
    formData.append("deleteImageIds", JSON.stringify(deleteImageIds));

    return formData;
  };

  /* Handle submit form */
  const handleOnSubmit = (data) => {
    const formData = buildFormData(data);
    mutate(formData);
  };

  if (isPending) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Container>
        <Main>
          <Section>
            <FormHeader>
              <Title tag='h5'>Basic</Title>
            </FormHeader>

            {/* SLUG - SUBTITLE */}

            <Field>
              <Input
                directions='column'
                placeholder='Enter title'
                register={register}
                label='Blog title *'
                {...register("title", { required: "Blog title is required" })}
              />
              <InputErrorMessage message={errors.title?.message} />
            </Field>

            <Field>
              <Input
                directions='column'
                label='Blog slug *'
                placeholder='Enter slug'
                register={register}
                {...register("slug", { required: "Blog slug is required" })}
              />
              <InputErrorMessage message={errors.slug?.message} />
            </Field>

            <Field>
              <Input directions='column' placeholder='Enter subtitle' label='Blog subtitle' register={register} {...register("subTitle")} />
            </Field>

            <Field>
              <TextArea
                directions='column'
                label='Short description'
                placeholder='Enter short description'
                register={register}
                {...register("shortDescription")}
              />
            </Field>
          </Section>

          <Section>
            <FormHeader>
              <Title tag='h5'>Content</Title>
            </FormHeader>

            <Field>
              <Controller
                name='content'
                control={control}
                render={({ field }) => <TextEditor content={field.value ?? ""} onChange={field.onChange} />}
              />
            </Field>
          </Section>

          <Section>
            <FormHeader>
              <Title tag='h5'>Gallery</Title>
            </FormHeader>
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
        </Main>

        <Sidebar>
          <ButtonGroup ref={btnRef}>
            <Button $variation='third'>Preview</Button>
            <Button>Save</Button>
          </ButtonGroup>

          {isFixed && (
            <FixedButton>
              <Button $variation='third'>Preview</Button>
              <Button>Save</Button>
            </FixedButton>
          )}

          <Section>
            <Field>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
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
                render={({ field }) => {
                  return (
                    <CustomSelect
                      {...field}
                      control={control}
                      options={blogCategoryData}
                      placeholder='Select categories'
                      label='Categories'
                      size='medium'
                      variation='transparent'
                      valueKey='value'
                    />
                  );
                }}
              />
            </Field>

            <Field>
              <Label>Tags</Label>
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
            <FormHeader>
              <Title tag='h5'>Banner</Title>
            </FormHeader>
            <Field>
              <ImageUploader
                name='bannerImage'
                value={watch("bannerImage")}
                onChange={(file) => setValue("bannerImage", file)}
              ></ImageUploader>
            </Field>
            <Field>
              <Input
                name='bannerImageAlt'
                directions='column'
                label='Banner description'
                placeholder='Enter banner description'
                register={register}
                {...register("bannerImageAlt")}
              />
            </Field>
          </Section>

          <Section>
            <FormHeader>
              <Title tag='h5'>Seo</Title>
            </FormHeader>
            <BlogSeoBlock register={register} />
          </Section>
        </Sidebar>
      </Container>
    </form>
  );
};

export default CreateBlog;

/**
 * Styled component
 */
const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 1.8rem;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Main = styled.main`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
`;

const Section = styled.section`
  border-bottom: 1px solid var(--color-border);
  padding: 2.4rem;
`;

const FormHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.8rem;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

const Field = styled.div`
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  padding: 2.4rem;
`;

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

/* ── Sidebar ── */
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  background-color: var(--color-white);
`;

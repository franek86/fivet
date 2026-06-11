/**
 * React & Hooks
 */
import { useEffect, useRef, useState } from "react";

/**
 * Third-party libraries
 */
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Grid2X2, Image, Pilcrow } from "lucide-react";

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
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Accordion from "../ui/Accordion.jsx";
import ImageUploader from "../ImageUploader.jsx";
import BlogSeoBlock from "./BlogSeoBlock.jsx";
import MultipleImagesUploader from "../MultipleImagesUploader.jsx";
import Spinner from "../Spinner.jsx";
import SortableBlocks from "./blog-dnd/SortableBlocks.jsx";
import AddBlockDropdown from "./blog-dnd/AddBlockDropdown.jsx";
import TextArea from "../ui/TextArea.jsx";
import Label from "../ui/Label.jsx";

/**
 * Styled component
 */
const Container = styled.div`
  display: grid;
  gap: 1rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 360px;
  }
`;
const FormHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 4rem;

  @media screen and (min-width: 640px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

const ImageBannerRow = styled(Row)`
  flex-direction: column;
  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

const Field = styled.div`
  margin-bottom: 2rem;
`;

const FullInput = styled.div`
  flex: 1;
`;
const HeaderInput = styled(FullInput)`
  order: 2;
  @media screen and (min-width: 640px) {
    order: 1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  order: 1;

  @media screen and (min-width: 640px) {
    order: 2;
  }
`;

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

const AccordioWrapper = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
`;

/* ── Sidebar ── */
const Sidebar = styled.aside`
  border-left: 1px solid var(--color-border);
  background: var(--color-white);
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const BlockFiled = styled.div`
  .blocks {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 8px;
    border: 1px solid var(--color-border);
    font-size: 12px;
    color: var(--colot-text);
    margin-top: 8px;

    .blocks-icon {
      display: flex;
      align-items: center;
    }

    .blocks-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const CreateBlog = () => {
  const btnRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const { mutate, isPending } = useCreateBlog();
  const { data: categories, isLoading, error, isFetching } = useGetBlogCategories();

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteImageIds, setDeleteImageIds] = useState([]);

  /* Move button edit to bottom on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsFixed(!entry.isIntersecting);
    });

    if (btnRef.current) observer.observe(btnRef.current);
    return () => observer.disconnect();
  }, []);

  /* blog categorry data  */
  const blogCategoryData = categories?.map((cat) => {
    return {
      value: cat.id,
      name: cat.title,
    };
  });

  /* RFH */
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { gallery: [] },
    resolver: zodResolver(blogSchema),
  });

  const blogTitleWatch = watch("title", "");

  /* blocks array */
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "blocks",
  });

  /* Handle submit form */
  const handleOnSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("subTitle", data.subTitle);
    formData.append("shortDescription", data.shortDescription);
    formData.append("bannerImage", data.bannerImage);
    formData.append("bannerImageAlt", data.bannerImageAlt);
    formData.append("metaDescription", data.metaDescription);
    formData.append("metaTitle", data.metaTitle);
    formData.append("metaKeywords", data.metaKeywords);

    //tags
    const tagsArray = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    tagsArray.forEach((tag) => formData.append("tags", tag));

    newImages.forEach((img) => {
      formData.append("gallery", img.file);
    });

    const newGalleryMeta = newImages.map((img) => ({
      alt: img.alt,
    }));

    formData.append("galleryMeta", JSON.stringify(newGalleryMeta));

    data.blocks.forEach((block, i) => {
      formData.append(`blocks[${i}][text]`, block.text);
      formData.append(`blocks[${i}][imageAlt]`, block.imageAlt || "");
      formData.append(`blocks[${i}][order]`, i);
      if (block.imageUrl) {
        formData.append("blockImages", block.imageUrl);
      }
      /* if (block.type === "columns") {
        formData.append(`blocks[${i}][columns]`, JSON.stringify(block.columns));
      } */
    });

    if (data.categoryId) formData.append("categoryId", String(data.categoryId));
    if (data.status) formData.append("status", String(data.status));

    mutate(formData);
  };

  /* 
    Automatically generate a URL-friendly slug whenever the blog title changes.
  */
  useEffect(() => {
    const slugify = blogTitleWatch
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValue("slug", slugify);
  }, [blogTitleWatch]);

  if (isPending) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Container>
        <div>
          {/* HEADER */}
          <FormHeader>
            <HeaderInput>
              <Column>
                <Input
                  directions='column'
                  placeholder='Enter title *'
                  register={register}
                  {...register("title", { required: "Blog title is required" })}
                />
                <InputErrorMessage message={errors.title?.message} />
              </Column>
            </HeaderInput>

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
          </FormHeader>

          <AccordioWrapper>
            {/* SLUG - SUBTITLE */}
            <Accordion title='Main' defaultOpen>
              <Column>
                <Field>
                  <Input
                    directions='column'
                    placeholder='Enter subtitle'
                    label='Blog subtitle'
                    register={register}
                    {...register("subTitle")}
                  />
                </Field>
              </Column>

              <Column>
                <Field>
                  <TextArea
                    directions='column'
                    label='Short description'
                    placeholder='Enter short description'
                    register={register}
                    {...register("shortDescription")}
                  />
                </Field>
              </Column>
            </Accordion>

            {/* DRAG - DROP SECTION */}
            <Accordion title='Section'>
              <Column>
                <SortableBlocks fields={fields} register={register} control={control} remove={remove} move={move} append={append} />
                <AddBlockDropdown append={append} />
              </Column>
            </Accordion>

            <Accordion title='Gallery'>
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

            <Accordion title='SEO'>
              <BlogSeoBlock register={register} />
            </Accordion>
          </AccordioWrapper>
        </div>

        <Sidebar>
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
            <Input
              directions='column'
              label='Blog slug *'
              placeholder='Enter slug'
              register={register}
              {...register("slug", { required: "Blog slug is required" })}
            />
            <InputErrorMessage message={errors.slug?.message} />
          </Field>

          {/* BANNER IMAGE - SLUG - CATEGORIES */}

          <Field>
            <Label>Banner image</Label>
            <ImageUploader name='bannerImage' value={watch("bannerImage")} onChange={(file) => setValue("bannerImage", file)}>
              <Input
                name='bannerImageAlt'
                placeholder='Enter banner image description'
                register={register}
                {...register("bannerImageAlt")}
              />
            </ImageUploader>
          </Field>

          <Field>
            <Controller
              name='categoryId'
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  control={control}
                  options={blogCategoryData}
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
            <Input directions='column' label='Tags' placeholder='Vessel, tanker' register={register} {...register("tags")} />
            <span style={{ fontSize: 11, color: "#aaa" }}>Comma-separated</span>
            <InputErrorMessage message={errors.slug?.message} />
          </Field>

          <BlockFiled>
            <Label>{fields.length} blocks</Label>
            {fields.map((f, i) => (
              <div className='blocks' key={f.id}>
                <div className='blocks-icon'>
                  {f.type === "text" && <Pilcrow size={12} />}
                  {f.type === "image" && <Image size={12} />}
                  {f.type === "columns" && <Grid2X2 size={12} />}
                </div>
                <div className='blocks-text'>
                  {f.type === "text" ? f.text?.replace(/<[^>]+>/g, "").slice(0, 30) || "Empty text block" : f.imageAlt || "Image block"}
                </div>
                <div className='blocks-count'>#{i + 1}</div>
              </div>
            ))}
          </BlockFiled>
        </Sidebar>
      </Container>
    </form>
  );
};

export default CreateBlog;

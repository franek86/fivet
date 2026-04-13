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

/**
 * Validation Schema - Zod schema used to validate the blog form structure.
 */
import { blogSchema } from "../../utils/validationSchema.js";

/**
 * Constants - Static values used for blog categories and publishing status.
 */
import { BLOG_CATEGORIES, BLOG_STATUS } from "../../utils/constants.js";

/**
 * UI Components
 */
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Accordion from "../ui/Accordion.jsx";
import ImageUploader from "../ImageUploader.jsx";
import Tabs from "../ui/Tabs.jsx";
import BlogBlocks from "./BlogBlocks.jsx";
import AddBlockDropdown from "./AddBlockDropdown.jsx";

/**
 * Styled component
 */
const FormHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 4rem;
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

const Field = styled.div`
  margin-bottom: 2rem;
`;

const FullInput = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

const CreateBlog = () => {
  const dropdownRef = useRef(null);
  const blockRefs = useRef([]);
  const btnRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsFixed(!entry.isIntersecting);
    });

    if (btnRef.current) observer.observe(btnRef.current);
    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { blocks: [{ text: "", imageUrl: null, imageAlt: "" }] },
    resolver: zodResolver(blogSchema),
  });

  const blogTitleWatch = watch("title", "");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "blocks",
  });

  const handleOnSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("subTitle", data.subTitle);
    formData.append("bannerImage", data.bannerImage);
    formData.append("bannerImageAlt", data.bannerImageAlt);

    data.blocks.forEach((block, i) => {
      /*  formData.append(`blocks[${i}][type]`, block.type); */
      /*  if (block.type === "text") formData.append(`blocks[${i}][text]`, block.text);
      if (block.type === "image") {
        formData.append(`blocks[${i}][imageAlt]`, block.imageAlt || "");
        if (block.imageUrl) formData.append(`blocks[${i}][imageUrl]`, block.imageUrl);
      } */
      formData.append(`blocks[${i}][text]`, block.text);
      formData.append(`blocks[${i}][imageAlt]`, block.imageAlt || "");
      if (block.imageUrl) {
        formData.append(`blocks[${i}][imageUrl]`, block.imageUrl);
      }
    });

    if (data.categoryId) formData.append("categoryId", String(data.categoryId));
    if (data.status) formData.append("status", String(data.status));

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
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

  console.log(errors);

  const handleAddBlock = (data) => {
    append(data);
    setTimeout(() => {
      const newBlock = blockRefs.current[fields.length - 1];
      console.log(newBlock);
      if (newBlock) {
        newBlock.scrollIntoView({ behavior: "smooth", block: "start" });
        newBlock.scrollTop = newBlock.offsetTop;
      }
    }, 450);
  };

  /* 
    Tabs Content
  */
  const tabs = [
    {
      label: "Content",
      content: (
        <div ref={dropdownRef}>
          <Accordion title='Section'>
            <Column>
              {fields.map((field, index) => (
                <div className={`test-${index}`} key={field.id} ref={(el) => (blockRefs.current[index] = el)}>
                  <BlogBlocks type={field.type} index={index} register={register} control={control} remove={remove} />
                </div>
              ))}
              <AddBlockDropdown append={handleAddBlock} dropdownRef={dropdownRef} />
            </Column>
          </Accordion>
        </div>
      ),
    },
    { label: "Gallery", content: <p>Gellery</p> },
    { label: "SEO", content: <p>SEO</p> },
  ];

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      {/* HEADER */}
      <FormHeader>
        <FullInput>
          <Column>
            <Input
              directions='column'
              placeholder='Enter title *'
              register={register}
              {...register("title", { required: "Blog title is required" })}
            />
            <InputErrorMessage message={errors.title?.message} />
          </Column>
        </FullInput>

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

      {/* SLUG - SUBTITLE */}
      <Row>
        <Column>
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
        </Column>
        <Column>
          <Field>
            <Input directions='column' placeholder='Enter subtitle' label='Blog subtitle' register={register} {...register("subTitle")} />
          </Field>
        </Column>
      </Row>

      {/* BANNER IMAGE - SLUG - CATEGORIES */}
      <Row>
        <Column>
          <ImageUploader name='bannerImage' value={watch("bannerImage")} onChange={(file) => setValue("bannerImage", file)}>
            <Input
              type='text'
              name='bannerImageAlt'
              placeholder='Enter banner image description'
              register={register}
              {...register("bannerImageAlt")}
            />
          </ImageUploader>
        </Column>

        <Column>
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
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  control={control}
                  options={BLOG_CATEGORIES}
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
        </Column>
      </Row>

      {/* CONTENT */}
      <Tabs tabs={tabs} />
    </form>
  );
};

export default CreateBlog;

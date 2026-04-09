import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styled from "styled-components";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Accordion from "../ui/Accordion.jsx";
import ImageUploader from "../ImageUploader.jsx";

import { blogSchema } from "../../utils/validationSchema.js";
import { BLOG_CATEGORIES, BLOG_STATUS } from "../../utils/constants.js";
import Tabs from "../ui/Tabs.jsx";
import BlogBlocks from "./BlogBlocks.jsx";

const FormHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 4rem;
`;

const FormWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 30rem;
  }
`;

const BannerImageWrapper = styled.div`
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

const AddBlockBtn = styled.div`
  background: var(--bg-linear-gradient);
  color: var(--color-grey-0);
  width: max-content;
  padding: 0.85rem 1.2rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { blocks: [] },
    resolver: zodResolver(blogSchema),
  });

  const blogTitleWatch = watch("title", "");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "blocks",
  });

  const handleOnSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("subTitle", data.subTitle);
    if (data.categoryId) formData.append("categoryId", String(data.categoryId));

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

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

  /* TABS CONTENT */
  const tabs = [
    {
      label: "Content",
      content: (
        <div>
          <Accordion title='Banner image'>
            <Column>
              <BannerImageWrapper>
                <ImageUploader name='bannerImage' value={watch("bannerImage")} onChange={(file) => setValue("bannerImage", file)}>
                  <Input
                    type='text'
                    name='bannerImageAlt'
                    placeholder='Enter banner image description'
                    register={register}
                    {...register("bannerImageAlt")}
                  />
                </ImageUploader>
              </BannerImageWrapper>
            </Column>
          </Accordion>

          <Accordion title='Section'>
            <Column>
              <BlogBlocks register={register} remove={remove} />
              {fields.map((field, index) => (
                <BlogBlocks key={field.id} index={index} register={register} remove={remove} />
              ))}
              <AddBlockBtn onClick={() => append({ text: "" })}>Add block</AddBlockBtn>
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

        <ButtonGroup>
          <Button $variation='third'>Preview</Button>
          <Button>Save</Button>
        </ButtonGroup>
      </FormHeader>

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

      <FormWrapper>
        {/* CONTENT */}
        <Tabs tabs={tabs} />

        {/* SIDEBAR */}
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
                  valueKey='id'
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
                  valueKey='id'
                  {...register("categoryId")}
                />
              )}
            />
          </Field>
        </Column>
      </FormWrapper>
    </form>
  );
};

export default CreateBlog;

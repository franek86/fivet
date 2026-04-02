import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styled from "styled-components";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

import { blogSchema } from "../../utils/validationSchema.js";
import { BLOG_CATEGORIES, BLOG_STATUS } from "../../utils/constants.js";
import ImageUploader from "../ImageUploader.jsx";
import { useEffect, useState } from "react";
import Accordion from "../ui/Accordion.jsx";

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
`;

const Column = styled(Row)`
  flex-direction: column;
  gap: 0;
`;

const Field = styled.div`
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const FullInput = styled.div`
  flex: 1;
`;

const Tab = styled.div`
  background-color: var(--color-grey-0);
`;

const TabHeader = styled.header`
  display: flex;
`;

const TabLabel = styled.div`
  background-color: ${({ $isActive }) => ($isActive ? "var(--color-brand-200)" : "var(--color-grey-50)")};
  padding: 1.2rem;
  font-weight: bold;
  border-right: 1px solid var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-200);
  box-shadow: var(--box-shadow-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-brand-200);
  }
`;
const TabContent = styled.main`
  padding: 2rem;
`;

const CreateBlog = () => {
  const [activeTab, setActiveTab] = useState("content");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(blogSchema),
  });

  const blogTitleWatch = watch("title", "");

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

  const tabs = [
    { id: "content", label: "Content" },
    { id: "gallery", label: "Gallery" },
    { id: "seo", label: "SEO" },
  ];

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
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormHeader>
        <FullInput>
          <Input
            directions='column'
            placeholder='Enter title *'
            register={register}
            {...register("title", { required: "Blog title is required" })}
          />
        </FullInput>
        <InputErrorMessage message={errors.title?.message} />

        <ButtonGroup>
          <Button $variation='third'>Preview</Button>
          <Button>Save</Button>
        </ButtonGroup>
      </FormHeader>

      <FormWrapper>
        <Tab>
          <TabHeader>
            {tabs?.map((tab) => (
              <TabLabel key={tab.id} onClick={() => setActiveTab(tab.id)} $isActive={activeTab === tab.id}>
                {tab.label}
              </TabLabel>
            ))}
          </TabHeader>
          <TabContent>
            {activeTab === "content" && (
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
                    <Field>
                      <Input
                        directions='column'
                        placeholder='e.g blog-title-slug'
                        label='Blog slug *'
                        register={register}
                        {...register("slug", { required: "Blog slug is required" })}
                      />
                      <InputErrorMessage message={errors.slug?.message} />
                    </Field>

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
                </Accordion>
              </div>
            )}

            {activeTab === "gallery" && <p>Gallery</p>}

            {activeTab === "seo" && <p>SEO</p>}
          </TabContent>
        </Tab>

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

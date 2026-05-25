import Input from "../ui/Input.jsx";
import TextArea from "../ui/TextArea.jsx";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BlogSeoBlock = ({ register }) => {
  return (
    <Wrapper>
      <div>
        <Input placeholder='Enter meta title' label='SEO meta title' directions='column' register={register} {...register("metaTitle")} />
      </div>

      <div>
        <Input
          placeholder='Enter meta keywords'
          label='SEO meta keywords'
          directions='column'
          register={register}
          {...register("metaKeywords")}
        />
      </div>
      <div>
        <TextArea
          placeholder='Enter meta description'
          label='SEO meta description'
          directions='column'
          register={register}
          {...register("metaDescription")}
        />
      </div>
    </Wrapper>
  );
};

export default BlogSeoBlock;

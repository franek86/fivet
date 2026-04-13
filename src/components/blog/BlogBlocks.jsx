/**
 * Third-party libraries
 */

import { Controller } from "react-hook-form";
import styled from "styled-components";
import { Trash2 } from "lucide-react";

/**
 * Feature Components - TipTap rich editor
 */
import TextEditor from "../text-editor/index.jsx";

/**
 * UI Componetns
 */
import UploadImageBlock from "./UploadImageBlock.jsx";
import Input from "../ui/Input.jsx";
import Label from "../ui/Label.jsx";

/**
 * Styled component
 */
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

const TextSection = styled.div`
  margin-bottom: 1.5rem;
`;
const ImageSection = styled.div`
  margin-bottom: 1.5rem;
`;

const BlockHeader = styled.header`
  width: max-content;
  margin-bottom: 0.8rem;
  background-color: var(--color-grey-0);
`;

const Btn = styled.div`
  display: flex;
  padding: 0.8rem;
  cursor: pointer;
  &:hover {
    background: var(--bg-linear-gradient-soft);
  }
`;

const BlogBlocks = ({ index, type, control, register, remove }) => {
  return (
    <>
      {type === "text" && (
        <TextSection>
          <BlockHeader>
            <Btn onClick={() => remove(index)}>
              <Trash2 size={18} />
            </Btn>
          </BlockHeader>
          <Controller
            control={control}
            name={`blocks.${index}.text`}
            render={({ field }) => <TextEditor content={field.value} onChange={field.onChange} />}
          />
        </TextSection>
      )}

      {type === "image" && (
        <ImageSection>
          <BlockHeader>
            <Btn onClick={() => remove(index)}>
              <Trash2 size={18} />
            </Btn>
          </BlockHeader>
          <>
            <Column>
              <Label>Upload image: </Label>
              <Controller control={control} name={`blocks.${index}.imageUrl`} render={({ field }) => <UploadImageBlock {...field} />} />
            </Column>
            <Column>
              <Label>Caption:</Label>
              <Controller
                control={control}
                name={`blocks.${index}.imageAlt`}
                render={({ field }) => <Input type='text' placeholder='Image alt text' {...field} />}
              />
            </Column>
          </>
        </ImageSection>
      )}
    </>
  );
};

export default BlogBlocks;

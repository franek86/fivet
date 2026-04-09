import styled from "styled-components";
import TextEditor from "../text-editor/index.jsx";
import { Trash2 } from "lucide-react";

const BlockSection = styled.div`
  margin-bottom: 2rem;
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

const BlogBlocks = ({ index, register, remove }) => {
  return (
    <BlockSection>
      <BlockHeader>
        <Btn type='button' onClick={() => remove(index)}>
          <Trash2 size={18} />
        </Btn>
      </BlockHeader>
      <TextEditor />
    </BlockSection>
  );
};

export default BlogBlocks;

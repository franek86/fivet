import styled from "styled-components";
import Label from "./Label.jsx";
import { forwardRef } from "react";

const Wrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$directions};
  margin-bottom: 2rem;
`;

const StyledTextArea = styled.textarea`
  background-color: var(--color-silver-50);
  padding: 1.25rem 0.9rem;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-sm);

  &::placeholder {
    color: var(--color-grey-500);
    font-size: 1.3rem;
    font-style: italic;
  }
`;

const TextArea = forwardRef(({ directions, register, label, name }, ref) => {
  return (
    <Wrap $directions={directions}>
      {label && <Label>{label}</Label>}
      <StyledTextArea ref={ref} rows='5' cols='15' id={name} {...(register ? register(name) : {})}></StyledTextArea>
    </Wrap>
  );
});

export default TextArea;

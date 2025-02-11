import styled from "styled-components";
import Label from "./Label.jsx";

const Wrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.directions};
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

function TextArea({ directions, placeholder, register, label, name, ...rest }) {
  return (
    <Wrap directions={directions}>
      {label && <Label>{label}</Label>}
      <StyledTextArea rows='5' cols='15' id={name} {...(register ? register(name) : {})} {...rest}>
        {placeholder}
      </StyledTextArea>
    </Wrap>
  );
}

export default TextArea;

import styled from "styled-components";
import Label from "./Label.jsx";
import { forwardRef } from "react";

const Wrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$directions};
`;

const StyledInput = styled.input`
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

const Input = forwardRef(({ directions, type = "text", placeholder, register, label, name, ...props }, ref) => {
  return (
    <Wrap $directions={directions}>
      {label && <Label>{label}</Label>}
      <StyledInput ref={ref} type={type} id={name} placeholder={placeholder} {...(register ? register(name) : {})} {...props} />
    </Wrap>
  );
});

export default Input;

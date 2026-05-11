import styled from "styled-components";
import Label from "./Label.jsx";
import { forwardRef } from "react";

const Wrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$directions};
  align-items: baseline;
`;

const StyledInput = styled.input`
  background-color: var(--color-white);
  padding: 1.25rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  min-width: 100%;

  &::placeholder {
    color: var(--color-text);
  }
`;

const Input = forwardRef(({ directions, type = "text", placeholder, register, label, name, ...props }, ref) => {
  return (
    <Wrap $directions={directions}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput ref={ref} type={type} id={name} placeholder={placeholder} {...(register ? register(name) : {})} {...props} />
    </Wrap>
  );
});

Input.displayName = "Input";

export default Input;

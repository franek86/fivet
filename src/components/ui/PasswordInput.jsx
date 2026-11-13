import { forwardRef, useState } from "react";
import styled from "styled-components";

import InputErrorMessage from "./InputErrorMessage.jsx";
import { Eye, EyeOff } from "lucide-react";
import Label from "./Label.jsx";

const PasswordInput = forwardRef(({ errors, label, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Column>
      <PasswordWrap>
        <Label>{label}</Label>

        <Input ref={ref} type={visible ? "text" : "password"} placeholder='**********' {...props} />
        <PasswordIcon onClick={() => setVisible((v) => !v)}>
          {visible ? <EyeOff className='input-icon' size={18} /> : <Eye className='input-icon' size={16} />}
        </PasswordIcon>
      </PasswordWrap>
      <InputErrorMessage message={errors} />
    </Column>
  );
});

export default PasswordInput;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const PasswordWrap = styled.div`
  position: relative;
`;

export const PasswordIcon = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  top: 37px;
  cursor: pointer;
`;

export const Input = styled.input`
  background-color: var(--color-white);
  padding: 1.35rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  min-width: 100%;

  &::placeholder {
    font-size: 1.2rem;
    color: var(--color-text-muted);
  }
`;

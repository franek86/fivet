import { useState } from "react";
import styled from "styled-components";

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Label = styled.span`
  font-size: 16px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: var(--color-green-700);
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-red-700);
  transition: 0.4s;
  border-radius: 28px;

  &:before {
    content: "";
    position: absolute;
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

function ToggleSwitch({ label, onChange, checked }) {
  return (
    <SwitchWrapper>
      {label && <Label>{label}</Label>}
      <Switch>
        <Checkbox type='checkbox' checked={checked} onChange={onChange} />
        <Slider />
      </Switch>
    </SwitchWrapper>
  );
}

export default ToggleSwitch;

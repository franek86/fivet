import { forwardRef, useState } from "react";
import { useController } from "react-hook-form";
import Label from "./Label.jsx";
import styled, { css } from "styled-components";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const sizes = {
  small: css`
    padding: 0.5rem 0.75rem;
    font-size: 1.4rem;
  `,
  medium: css`
    padding: 1.25rem 0.9rem;
  `,
  full: css`
    width: 100%;
    padding: 1.25rem 0.9rem;
  `,
};

const variations = {
  primary: css`
    border: 1px solid var(--color-brand-500);
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
  `,
  transparent: css`
    border: 1px solid var(--color-grey-500);
    background-color: transparent;
  `,
};

const Wrap = styled.div`
  position: relative;
  max-width: max-content;
  min-width: 100%;
  display: flex;
  flex-direction: ${(props) => props.$directions};
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  ${(props) => sizes[props.$size || ""]};
  ${(props) => variations[props.$variation || ""]};
  border-radius: var(--border-radius-sm);
  cursor: pointer;
`;

const SelectDropdown = styled.div`
  position: absolute;
  left: 0;
  width: max-content;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  padding: 1.25rem 0;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  z-index: 2;
`;

const SelectOption = styled.div`
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: ${(props) => (props.$selected ? "var(--color-brand-200)" : "var(--color-grey-100)")};
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-200);
  }
`;

const CustomSelect = forwardRef(({ name, control, options, label, size, directions = "column", variation, valueKey = "name" }, ref) => {
  if (!control) {
    console.error(`❌ CustomSelect: Missing 'control' prop for ${name}`);
    return null;
  }

  const { field } = useController({ name, control });
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options?.find((option) => option[valueKey] === field.value) || null;

  const handleSelect = (option) => {
    field.onChange(option[valueKey]);
    setIsOpen(false);
  };

  return (
    <Wrap $directions={directions}>
      <Label htmlFor={field.value}>{label}</Label>

      <Select ref={ref} onClick={() => setIsOpen(!isOpen)} $size={size} $variation={variation}>
        {selectedOption ? selectedOption.name : "Select item"}
        {isOpen ? <LuChevronUp /> : <LuChevronDown />}
      </Select>

      {isOpen && (
        <SelectDropdown>
          {options?.map((option) => (
            <SelectOption key={option.name} $selected={field.value === option[valueKey]} onClick={() => handleSelect(option)}>
              {option.name}
            </SelectOption>
          ))}
        </SelectDropdown>
      )}
    </Wrap>
  );
});

export default CustomSelect;

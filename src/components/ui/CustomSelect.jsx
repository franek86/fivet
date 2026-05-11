import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import Label from "./Label.jsx";
import styled, { css } from "styled-components";

import { toggleDropdownByName } from "../../slices/uiSlice.js";
import { adjustDropdownAlignment } from "../../utils/isOverflowRight.js";
import { ChevronDown, ChevronUp } from "lucide-react";

const sizes = {
  small: css`
    padding: 0.5rem 0.75rem;
    font-size: 1.25rem;
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
    border: 1px solid var(--color-border);
    background-color: var(--color-accent);
    color: var(--color-text);
  `,
  transparent: css`
    border: 1px solid var(--color-border);
    background-color: var(--color-white);
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

  ${(props) => sizes[props.$size || ""]};
  ${(props) => variations[props.$variation || ""]};
  border-radius: var(--border-radius-lg);
  cursor: pointer;
`;

const SelectDropdown = styled.div`
  position: absolute;
  ${(props) => (props.$alignRight ? "right: 0;" : "left: 0;")}
  top: 100%;
  width: max-content;
  background-color: var(--color-grey-200);
  border: 1px solid var(--color-border);
  padding: 1.25rem 0;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 2;
`;

const SelectOption = styled.div`
  padding: 1.2rem;
  border-radius: var(--border-radius-lg);
  background-color: ${(props) => (props.$selected ? "var(--color-accent)" : "var(--color-grey-100)")};
  color: ${(props) => (props.$selected ? "var(--color-text)" : "var(--color-grey-700)")};

  cursor: pointer;

  &:hover {
    background-color: var(--color-accent);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #eee;
  outline: none;
`;

const CustomSelect = forwardRef(({ name, control, options, label, size, directions = "column", variation, valueKey = "name" }) => {
  const { field } = useController({ name, control });
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isDropdownOpenByName);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const [alignRight, setAlignRight] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = search ? options?.filter((option) => option.name.toLowerCase().includes(search.toLowerCase())) : options;

  const selectedOption = options?.find((option) => option[valueKey] === field.value) || null;
  const openedSelect = isOpen === name;

  const handleSelect = (option) => {
    field.onChange(option[valueKey]);
    dispatch(toggleDropdownByName(name));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) {
        dispatch(toggleDropdownByName(name));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch, name]);

  useEffect(() => {
    if (openedSelect && dropdownRef.current) {
      adjustDropdownAlignment(dropdownRef.current, setAlignRight);
    }
  }, [openedSelect]);

  if (!control) {
    console.error(`❌ CustomSelect: Missing 'control' prop for ${name}`);
    return null;
  }

  return (
    <Wrap $directions={directions}>
      <Label htmlFor={field.value}>{label}</Label>

      <Select ref={triggerRef} onClick={() => dispatch(toggleDropdownByName(name))} $size={size} $variation={variation}>
        {selectedOption ? selectedOption.name : "Select item"}
        {openedSelect ? <ChevronUp /> : <ChevronDown />}
      </Select>

      {openedSelect && (
        <SelectDropdown ref={dropdownRef} $alignRight={alignRight}>
          <SearchInput
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          {filteredOptions?.map((option) => (
            <SelectOption key={option.name} $selected={field.value === option[valueKey]} onClick={() => handleSelect(option)}>
              {option.name}
            </SelectOption>
          ))}
        </SelectDropdown>
      )}
    </Wrap>
  );
});

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;

import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import styled from "styled-components";
import { useClickOutSide } from "../../hooks/useClickOutside.js";

function Sort({ items = [], value, label = "Sort by:", onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedItem = items.find((item) => item.value === value);

  const handleSelect = (item) => {
    onChange?.(item.value);
    setOpen(false);
  };

  useClickOutSide(containerRef, () => setOpen(false));

  return (
    <SortWrap ref={containerRef}>
      <Label>{label}</Label>
      <Dropdown>
        <Trigger type='button' onClick={() => setOpen((current) => !current)} $open={open}>
          <SelectedValue>{selectedItem?.name || "Select..."}</SelectedValue>

          <ChevronDown size={17} strokeWidth={2} />
        </Trigger>

        {open && (
          <Menu>
            {items.map((item) => {
              const isSelected = item.value === value;

              return (
                <MenuItem key={item.value} type='button' $selected={isSelected} onClick={() => handleSelect(item)}>
                  <span>{item.name}</span>

                  {isSelected && <Check size={16} strokeWidth={2} />}
                </MenuItem>
              );
            })}
          </Menu>
        )}
      </Dropdown>
    </SortWrap>
  );
}

export default Sort;

const SortWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Label = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-text);

  white-space: nowrap;
`;

const Dropdown = styled.div`
  position: relative;
  min-width: 18rem;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  height: 4rem;

  padding: 0 1.2rem;

  border: 1px solid ${({ $open }) => ($open ? "var(--color-accent-600)" : "var(--color-bg)")};

  border-radius: var(--border-radius-sm);

  background: var(--color-white);
  color: var(--color-text);

  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: var(--color-text);
  }

  &:focus-visible {
    outline: none;

    border-color: var(--color-border);

    box-shadow: var(--shadow-md);
  }

  svg {
    flex-shrink: 0;

    transition: transform 0.2s;

    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
  }
`;

const SelectedValue = styled.span`
  //overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text);
`;

const Menu = styled.div`
  position: absolute;

  top: calc(100% + 0.5rem);
  right: 0;

  z-index: 100;

  width: 100%;
  min-width: 20rem;

  padding: 0.5rem;

  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);

  background: var(--color-white);

  box-shadow: var(--shadow-md);
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0.9rem 1rem;

  border: none;
  border-radius: 0.6rem;

  background: ${({ $selected }) => ($selected ? "var(--color-grey-200)" : "transparent")};

  color: ${({ $selected }) => ($selected ? "var(--color-text)" : "var(--color-text-muted)")};

  font-size: 1.25rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};

  text-align: left;

  cursor: pointer;

  &:hover {
    background: var(--color-bg);
  }

  svg {
    flex-shrink: 0;
  }
`;

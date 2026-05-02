/**
 * React & Hooks
 */
import { useEffect, useRef, useState } from "react";

/**
 * Third-party libraries
 */
import styled from "styled-components";
import { CirclePlus } from "lucide-react";

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: var(--bg-linear-gradient);
  color: var(--color-grey-0);
  padding: 0.85rem 1.2rem;
  font-size: 1.2rem;
  cursor: pointer;
  width: max-content;

  &:hover {
    background: var(--bg-linear-gradient-soft);
  }
`;

const DropdownContent = styled.div`
  //display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: white;
  min-width: 140px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const AddBlockDropdown = ({ append, dropdownRef }) => {
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    const rect = menuRef.current.getBoundingClientRect();
    setMenuPos({
      top: rect.top,
      left: rect.right,
    });
    setOpen((prev) => !prev);
  };

  return (
    <Dropdown>
      <DropdownButton ref={menuRef} onClick={() => handleClick()}>
        <CirclePlus size={14} /> Add Block
      </DropdownButton>
      {open && (
        <DropdownContent top={menuPos.top} left={menuPos.left}>
          <DropdownItem
            onClick={() => {
              append({ type: "text", text: "" });
              setOpen(false);
            }}
          >
            Text Block
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              append({ type: "image", imageUrl: null, imageAlt: "" });
              setOpen(false);
            }}
          >
            Image Block
          </DropdownItem>
        </DropdownContent>
      )}
    </Dropdown>
  );
};

export default AddBlockDropdown;

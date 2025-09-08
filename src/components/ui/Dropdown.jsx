import { useEffect, useRef, useState } from "react";
import { LuEllipsis } from "react-icons/lu";
import styled from "styled-components";
import { adjustDropdownAlignment } from "../../utils/isOverflowRight.js";

const WrapDropdown = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${({ label }) => label && `background-color: var(--color-grey-200)`};
  padding: 0.6rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  max-width: max-content;
  margin: auto;
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  ${(props) => (props.$alignRight ? "right: 0;" : "left: 0;")}
  //left: ${({ $position }) => $position.x}px;
  width: max-content;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  z-index: 1;
`;

function Dropdown({ children, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [alignRight, setAlignRight] = useState(false);

  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      setPosition({
        y: rect.height,
        x: 0,
      });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      adjustDropdownAlignment(dropdownRef.current, setAlignRight);
    }
  }, [isOpen]);

  return (
    <WrapDropdown ref={triggerRef} onClick={handleClick}>
      {label ?? <LuEllipsis />}
      {isOpen && (
        <StyledDropdown ref={dropdownRef} $alignRight={alignRight} $position={position} style={{ top: position.y }}>
          {children}
        </StyledDropdown>
      )}
    </WrapDropdown>
  );
}

export default Dropdown;

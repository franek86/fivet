import { useState } from "react";
import { LuEllipsis } from "react-icons/lu";
import styled from "styled-components";

const WrapDropdown = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-grey-200);
  padding: 0.6rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
`;

const StyledDropdown = styled.div`
  position: absolute;
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
  width: max-content;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);

  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
`;

function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleClick = (e) => {
    const target = e.target;
    const rect = target.closest("div").getBoundingClientRect();

    setPosition({
      x: rect.x,
      y: rect.y + rect.height + 0,
    });
    setIsOpen((prev) => !prev);
  };

  return (
    <WrapDropdown onClick={handleClick}>
      <LuEllipsis />
      {isOpen && <StyledDropdown position={position}>{children}</StyledDropdown>}
    </WrapDropdown>
  );
}

export default Dropdown;

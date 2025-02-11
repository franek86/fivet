import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import styled from "styled-components";

const AccordionItem = styled.section`
  margin: 2rem 0;
`;

const AccordionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-brand-500);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--color-grey-500);
  }

  p {
    font-size: 1.6rem;
    color: var(--color-brand-500);
  }

  &:hover {
    p,
    svg {
      color: var(--color-grey-500);
    }
  }
`;

const AccordionBody = styled.main`
  max-height: ${({ open }) => (open ? "500px" : "0")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  padding: ${({ open }) => (open ? "1.2rem 0" : "0")};
  overflow-y: auto;
  background: var(--color-grey-0);
  transition: max-height 0.4s ease-in-out, opacity 0.5s ease-in-out, padding 0.5s ease-in-out;
`;

const StyledChevron = styled(LuChevronDown)`
  height: 2rem;
  width: 2rem;
  color: var(--color-brand-500);
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.4s ease-in-out;
`;

function Accordion({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem>
      <AccordionHeader onClick={() => setIsOpen((prev) => !prev)}>
        <p>{title}</p>
        <StyledChevron open={isOpen} />
      </AccordionHeader>
      <AccordionBody open={isOpen}>{children}</AccordionBody>
    </AccordionItem>
  );
}

export default Accordion;

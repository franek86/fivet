import { ChevronDown } from "lucide-react";
import { useState } from "react";

import styled from "styled-components";

const AccordionItem = styled.section`
  margin: 2rem 0;
  cursor: pointer;
`;

const AccordionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ open }) => (open ? "var(--color-accent)" : "var(--color-grey-200)")};

  padding: 10px 12px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-accent);
  }

  p {
    font-size: 1.6rem;
    color: var(--color-text);
  }

  &:hover {
    p,
    svg {
      color: var(--color-text);
    }
  }
`;

const AccordionBody = styled.main`
  max-height: ${({ open }) => (open ? "auto" : "0")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  padding: ${({ open }) => (open ? "1.2rem" : "0")};
  content-visibility: ${({ open }) => (open ? "visible" : "hidden")};
  background: var(--color-grey-200);

  /* transition:
    max-height 0.4s ease-in-out,
    opacity 0.5s ease-in-out,
    padding 0.5s ease-in-out; */
`;

const StyledChevron = styled(ChevronDown)`
  height: 2rem;
  width: 2rem;
  color: var(--color-text);
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.4s ease-in-out;
`;

function Accordion({ children, title, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionItem onClick={() => setIsOpen((prev) => !prev)}>
      <AccordionHeader open={isOpen}>
        <p>{title}</p>
        <StyledChevron open={isOpen} />
      </AccordionHeader>
      <AccordionBody open={isOpen}>{children}</AccordionBody>
    </AccordionItem>
  );
}

export default Accordion;

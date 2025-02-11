import React from "react";
import { createPortal } from "react-dom";

import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem;
  transition: all 0.4s ease-in-out;
`;

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  transition: all 0.4s ease-in-out;
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0%.4rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  &:focus {
    outline: none;
  }

  &:hover svg {
    color: var(--color-grey-900);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-500);
  }
`;

function Modal({ children, onClose, name }) {
  const openName = useSelector((state) => state.modal.isOpenModalName);

  if (name !== openName) return null;
  return createPortal(
    <StyledOverlay>
      <StyledModal>
        <Button onClick={onClose}>
          <TfiClose />
        </Button>
        {children}
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
}

export default Modal;

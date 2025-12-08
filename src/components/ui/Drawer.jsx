import { createPortal } from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsDrawerClose } from "../../slices/uiSlice.js";
import { X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  z-index: 9;

  transform: ${({ $open, $position }) => {
    if ($position === "right") return $open ? "translateX(0)" : "translateX(100%)";
    else return $open ? "translateX(0)" : "translateX(-100%)";
  }};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`;

const Wrapper = styled.aside`
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  min-width: 260px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
  z-index: 10;

  ${({ $position, $open }) => {
    if ($position === "right") {
      return $open ? `right: 0;` : `right: -100%;`;
    } else if ($position === "left") {
      return $open ? `left: 0;` : `left: -100%;`;
    }
  }}

  transform: ${({ $open, $position }) => {
    if ($position === "right") return $open ? "translateX(0)" : "translateX(100%)";
    else return $open ? "translateX(0)" : "translateX(-100%)";
  }};
  transition: all 0.3s ease-in-out;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Content = styled.div``;

function Drawer({ position = "right", children }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isDrawerOpen);
  return createPortal(
    <>
      <Overlay $position={position} $open={isOpen} onClick={() => dispatch(setIsDrawerClose())} />
      <Wrapper $position={position} $open={isOpen}>
        <Header>
          <X size={30} onClick={() => dispatch(setIsDrawerClose())} />
        </Header>
        <Content>{children}</Content>
      </Wrapper>
    </>,
    document.body
  );
}

export default Drawer;

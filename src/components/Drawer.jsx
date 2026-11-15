import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { X } from "lucide-react";

const Drawer = ({ title, children, name, onClose }) => {
  const isOpen = useSelector((state) => state.modal.isOpenModalName);

  return (
    <>
      <Overlay $active={isOpen === name} onClick={onClose}></Overlay>
      <Main $active={isOpen === name}>
        <Header>
          <Title>{title}</Title>
          <div onClick={onClose}>
            <X size={32} color='#ffffff' />
          </div>
        </Header>
        <Body>{children}</Body>
      </Main>
    </>
  );
};

export default Drawer;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 5;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  visibility: ${({ $active }) => ($active ? "visible" : "hidden")};
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
`;

const Main = styled.div`
  height: auto;
  width: 450px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-white);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);
  z-index: 10;
  overflow: scroll;
  transform: translateX(${({ $active }) => ($active ? "0" : "100%")});
  transition: transform 0.5s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.5rem;
  background-color: var(--color-accent);
`;

const Title = styled.div`
  color: var(--color-white);
  font-size: 2.2rem;
`;

const Body = styled.div`
  padding: 3rem 3.5rem;
  height: calc(100vh - 150px);
  overflow-y: scroll;
`;

import { useSelector } from "react-redux";
import styled from "styled-components";

import Nav from "../components/nav/Nav.jsx";
import Logo from "./Logo.jsx";

const Aside = styled.aside`
  width: 100%;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-right: 1px solid var(--color-border);
  z-index: 1;

  @media screen and (min-width: 640px) {
    position: sticky;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100px;
  }

  @media screen and (min-width: 1024px) {
    width: 240px;
  }
`;

const AsideWrapperBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: ${({ $props }) => ($props ? "100%" : "0")};
  opacity: ${({ $props }) => ($props ? "1" : "0")};
  visibility: ${({ $props }) => ($props ? "visible" : "hidden")};

  @media screen and (min-width: 640px) {
    height: 100%;
    opacity: 1;
    visibility: visible;
  }
`;

const AsideFooter = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Sidebar() {
  const toggleNav = useSelector((state) => state.ui.isToggleNav);
  return (
    <Aside>
      <Logo />

      <AsideWrapperBottom $props={toggleNav}>
        <Nav />
        <AsideFooter></AsideFooter>
      </AsideWrapperBottom>
    </Aside>
  );
}

export default Sidebar;

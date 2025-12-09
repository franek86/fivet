import { useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "./Nav.jsx";
import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";
import Logout from "./Logout.jsx";

const Aside = styled.aside`
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-50);
  height: 100vh;
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
        <AsideFooter>
          <Avatar />
          <Logout />
        </AsideFooter>
      </AsideWrapperBottom>
    </Aside>
  );
}

export default Sidebar;

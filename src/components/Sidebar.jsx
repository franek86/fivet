import styled from "styled-components";
import Nav from "./Nav.jsx";
import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";
import Logout from "./Logout.jsx";

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AsideWrapper = styled.div``;

const AsideWrapperBottom = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Sidebar() {
  return (
    <Aside>
      <AsideWrapper>
        <Logo />
        <Nav />
      </AsideWrapper>
      <AsideWrapperBottom>
        <Avatar />
        <Logout />
      </AsideWrapperBottom>
    </Aside>
  );
}

export default Sidebar;

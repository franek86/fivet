import styled from "styled-components";
import Nav from "./Nav.jsx";
import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AsideWrapper = styled.div``;

function Sidebar() {
  return (
    <Aside>
      <AsideWrapper>
        <Logo />
        <Nav />
      </AsideWrapper>
      <Avatar />
    </Aside>
  );
}

export default Sidebar;

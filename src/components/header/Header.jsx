import { useState } from "react";

import styled, { css } from "styled-components";

import Theme from "../Theme.jsx";
import Avatar from "../Avatar.jsx";
import Logout from "../Logout.jsx";
import NotificationIcon from "../notification/NotificationIcon.jsx";
import { Link } from "react-router";
import { UserPen } from "lucide-react";

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  padding: 1.6rem 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
`;

const DropDownBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 200px;
  transform: translateY(0);
  padding: 1rem 1.2rem;
  position: absolute;
  right: 0;
  ${({ fromTop }) =>
    fromTop
      ? css`
          transform: translateY(66px);
          opacity: 1;
          visibility: visible;
        `
      : css`
          transform: translateY(0);
          opacity: 0;
          visibility: hidden;
        `}
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
`;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const P = styled.p`
  font-size: 1.4rem;
`;

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <HeaderWrap>
      <NotificationIcon />
      <HeaderRight onClick={() => handleToggle()}>
        <Avatar />
        <DropDownBox fromTop={toggle}>
          <Theme />
          <HeaderLink to='/profile'>
            <UserPen size={18} />
            <P>Profile</P>
          </HeaderLink>
          <Logout />
        </DropDownBox>
      </HeaderRight>
    </HeaderWrap>
  );
};

export default Header;

import { useRef, useState } from "react";

import styled, { css } from "styled-components";

import Theme from "../Theme.jsx";
import Avatar from "../Avatar.jsx";
import Logout from "../Logout.jsx";
import NotificationIcon from "../notification/NotificationIcon.jsx";
import { Link } from "react-router";
import { UserPen } from "lucide-react";
import SubscriptionStatus from "../SubscriptionStatus.jsx";
import { useUser } from "../../hooks/useAuth.js";
import { useClickOutSide } from "../../hooks/useClickOutside.js";

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  gap: 16px;
  margin-bottom: 24px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  transform: translateY(0);
  padding: 1rem 1.2rem;
  /* ${({ fromTop }) =>
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
        `} */
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
`;

const AvatarButton = styled.div``;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text-muted);
`;

const P = styled.p`
  font-size: 14px;
`;

const Header = () => {
  const dropDownRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUser();

  useClickOutSide(dropDownRef, () => setIsOpen(false));

  return (
    <HeaderWrap>
      <HeaderLeft>
        <NotificationIcon />
        {data.role !== "ADMIN" && <SubscriptionStatus subscription={data?.subscription} />}
      </HeaderLeft>

      <HeaderRight ref={dropDownRef}>
        <AvatarButton onClick={() => setIsOpen((prev) => !prev)}>
          <Avatar />
        </AvatarButton>
        {isOpen && (
          <Dropdown>
            <Theme />
            <HeaderLink to='/profile'>
              <UserPen size={18} />
              <P>Profile</P>
            </HeaderLink>
            <Logout />
          </Dropdown>
        )}
      </HeaderRight>
    </HeaderWrap>
  );
};

export default Header;

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import styled from "styled-components";

import NotificationIcon from "./notification/NotificationIcon.jsx";

import { MdClose, MdMenu } from "react-icons/md";
import { toggleNav } from "../slices/uiSlice.js";
import { useNotificationSocket } from "../hooks/useNotification.js";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  @media screen and (min-width: 640px) {
    padding: 3rem 2rem;
  }
`;

const LogoNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (min-width: 640px) {
    flex-direction: column;
    gap: 2rem;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StyledLogo = styled(NavLink)`
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  @media screen and (min-width: 640px) {
    font-size: 3rem;
  }
`;

const StyledBar = styled.div`
  display: block;
  margin-left: 2rem;
  cursor: pointer;
  @media screen and (min-width: 640px) {
    display: none;
    padding: 3rem 2rem;
  }
`;

function Logo() {
  const { unreadCount } = useNotificationSocket();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isToggle = useSelector((state) => state.ui.isToggleNav);

  return (
    <LogoWrapper>
      <LogoNotification>
        <StyledLogo>Fivet</StyledLogo>

        {role === "ADMIN" && <NotificationIcon count={unreadCount} />}
      </LogoNotification>
      <StyledBar onClick={() => dispatch(toggleNav())}>{isToggle ? <MdClose size={25} /> : <MdMenu size={25} />}</StyledBar>
    </LogoWrapper>
  );
}

export default Logo;

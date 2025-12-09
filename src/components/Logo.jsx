import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import NotificationIcon from "./notification/NotificationIcon.jsx";

import { toggleNav } from "../slices/uiSlice.js";
import { Menu, ShipWheelIcon, X } from "lucide-react";

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
  cursor: pointer;

  @media screen and (min-width: 640px) {
    flex-direction: column;
    gap: 2rem;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LogoIcon = styled.div`
  background: var(--bg-linear-gradient);
  display: flex;
  padding: 1rem;
  border-radius: 50%;
`;

const LogoText = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  background: var(--bg-linear-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isToggle = useSelector((state) => state.ui.isToggleNav);

  return (
    <LogoWrapper>
      <LogoNotification>
        <StyledLogo onClick={() => navigate("/dashboard")}>
          <LogoIcon>
            <ShipWheelIcon size={24} color='#ffffff' />
          </LogoIcon>
          <LogoText>Fivet</LogoText>
        </StyledLogo>
        <NotificationIcon />
      </LogoNotification>
      <StyledBar onClick={() => dispatch(toggleNav())}>{isToggle ? <X size={25} /> : <Menu size={25} />}</StyledBar>
    </LogoWrapper>
  );
}

export default Logo;

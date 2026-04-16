import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import styled from "styled-components";
import { Menu, ShipWheelIcon, X } from "lucide-react";

import { toggleNav } from "../slices/uiSlice.js";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  @media screen and (min-width: 640px) {
    padding: 2rem 1.2rem;
    justify-content: center;
  }

  @media screen and (min-width: 1024px) {
    justify-content: space-between;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
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

  @media screen and (min-width: 640px) {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    display: block;
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
      <StyledLogo onClick={() => navigate("/dashboard")}>
        <LogoIcon>
          <ShipWheelIcon size={24} color='#ffffff' />
        </LogoIcon>
        <LogoText>Fivet</LogoText>
      </StyledLogo>

      <StyledBar onClick={() => dispatch(toggleNav())}>{isToggle ? <X size={25} /> : <Menu size={25} />}</StyledBar>
    </LogoWrapper>
  );
}

export default Logo;

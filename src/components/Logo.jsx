import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import styled from "styled-components";
import { Menu, ShipWheelIcon, X } from "lucide-react";

import { toggleNav } from "../slices/uiSlice.js";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media screen and (min-width: 640px) {
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
  gap: 10px;
`;

const LogoIcon = styled.div`
  background-color: var(--color-accent);
  display: flex;
  padding: 1rem;
  border-radius: 12px;
`;

const LogoText = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: var(--color-text);

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
          <ShipWheelIcon size={20} />
        </LogoIcon>
        <LogoText>Fivet</LogoText>
      </StyledLogo>

      <StyledBar onClick={() => dispatch(toggleNav())}>{isToggle ? <X size={25} /> : <Menu size={25} />}</StyledBar>
    </LogoWrapper>
  );
}

export default Logo;

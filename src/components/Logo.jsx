import { useDispatch } from "react-redux";
import { NavLink } from "react-router";
import styled from "styled-components";

import { FaBars } from "react-icons/fa";
import { toggleNav } from "../slices/uiSlice.js";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  @media screen and (min-width: 640px) {
    padding: 3rem 2rem;
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
  cursor: pointer;
  @media screen and (min-width: 640px) {
    display: none;
    padding: 3rem 2rem;
  }
`;

function Logo() {
  const dispatch = useDispatch();
  return (
    <LogoWrapper>
      <StyledLogo>Fivet</StyledLogo>
      <StyledBar>
        <FaBars onClick={() => dispatch(toggleNav())} />
      </StyledBar>
    </LogoWrapper>
  );
}

export default Logo;

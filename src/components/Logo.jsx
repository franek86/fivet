import React from "react";
import { NavLink } from "react-router";
import styled from "styled-components";

const StyledLogo = styled(NavLink)`
  display: block;
  padding: 3rem 2rem;
  font-size: 3rem;
  font-weight: 700;
`;

function Logo() {
  return <StyledLogo>Fivet</StyledLogo>;
}

export default Logo;

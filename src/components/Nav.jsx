import { NavLink } from "react-router";
import { navLinks } from "../utils/links.js";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavList = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1.2rem 2rem;
  font-size: 1.85rem;
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-brand-200);
    border-radius: var(--border-radius-sm);
  }
`;

function Nav() {
  return (
    <StyledNav>
      {navLinks.map((item) => (
        <NavList to={item.href} key={item.label}>
          <item.icon />
          {item.label}
        </NavList>
      ))}
    </StyledNav>
  );
}

export default Nav;

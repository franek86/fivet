import { NavLink } from "react-router";
import { navLinks } from "../utils/links.js";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavList = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 1.2rem 2rem;
  font-size: 1.85rem;
  @media screen and (min-width: 1024px) {
    justify-content: start;
  }
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-brand-200);
    border-radius: var(--border-radius-sm);
  }
`;

const NavItem = styled.div`
  display: block;
  font-size: 1.6rem;
  @media screen and (min-width: 640px) {
    display: none;
  }
  @media screen and (min-width: 1024px) {
    display: block;
  }
`;

function Nav() {
  const role = useSelector((state) => state.auth.role);
  return (
    <StyledNav>
      {navLinks
        .filter((item) => item.allowRoles.includes(role))
        .map((item) => (
          <NavList to={item.href} key={item.label}>
            <item.icon />
            <NavItem>{item.label}</NavItem>
          </NavList>
        ))}
    </StyledNav>
  );
}

export default Nav;

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { navLinks } from "../utils/links.js";
import styled from "styled-components";
import { closeNav } from "../slices/uiSlice.js";
import PremiumSticker from "./ui/PremiumSticker.jsx";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavList = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: start;

  gap: 10px;
  padding: 1.2rem 2rem;
  font-size: 1.85rem;

  @media screen and (min-width: 640px) {
    justify-content: center;
  }
  @media screen and (min-width: 1024px) {
    justify-content: start;
  }
  &:hover {
    color: var(--color-grey-700);
    background: var(--bg-linear-gradient-soft);
  }
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-50);
    background: var(--bg-linear-gradient);
    box-shadow: var(--shadow-md);
  }
`;

const NavItem = styled.div`
  position: relative;
  display: block;
  font-size: 1.5rem;
  @media screen and (min-width: 640px) {
    display: none;
  }
  @media screen and (min-width: 1024px) {
    display: block;
  }
`;

const NavBadge = styled.span`
  position: absolute;
  top: -1rem;
  right: -2rem;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-green-200);
  color: var(--color-grey-800);
`;

function Nav() {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const activeUserCount = useSelector((state) => state.realtime.activeUserCount);
  const badgeMap = { activeUsers: activeUserCount };
  return (
    <StyledNav>
      {navLinks
        .filter((item) => item.allowRoles.includes(role))
        .map((item) => (
          <NavList to={item.href} key={item.label} onClick={() => dispatch(closeNav())}>
            <item.icon size={20} />
            <NavItem>
              {item.label}
              {item.plan === "PREMIUM" ? <PremiumSticker /> : ""}
              {item.badgeKey && badgeMap[item.badgeKey] > 0 && <NavBadge>{badgeMap[item.badgeKey]}</NavBadge>}
            </NavItem>
          </NavList>
        ))}
    </StyledNav>
  );
}

export default Nav;

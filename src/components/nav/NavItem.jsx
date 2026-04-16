import { useRef, useState } from "react";
import { NavLink } from "react-router";

import { useDispatch } from "react-redux";
import styled from "styled-components";

import { closeNav } from "../../slices/uiSlice.js";

import PremiumSticker from "../ui/PremiumSticker.jsx";
import { ChevronDown, ChevronRight } from "lucide-react";

const NavContent = styled.div`
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

const NavDropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  gap: 10px;
  padding: 1.2rem 2rem;
  font-size: 1.85rem;
  cursor: pointer;

  &:hover {
    color: var(--color-grey-700);
    background: var(--bg-linear-gradient-soft);
  }

  @media screen and (min-width: 640px) {
    justify-content: center;
  }
  @media screen and (min-width: 1024px) {
    justify-content: space-between;
  }
`;
const NavDropdownInner = styled.div`
  display: flex;
  gap: 10px;
`;

const NavDropdownContent = styled.div`
  background: var(--color-grey-0);
  box-shadow: var(--shadow-md);

  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media screen and (min-width: 640px) {
    position: absolute;
    top: ${({ top }) => top}px;
    left: 100%;
    min-width: 180px;
  }
`;

const NavDropdownContentItem = styled(NavContent)`
  @media screen and (min-width: 640px) {
    display: block;
  }
`;

const NavDropdownIcon = styled.div`
  display: block;
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

const NavItem = ({ item, badgeMap }) => {
  const [menuPos, setMenuPos] = useState({ top: 0 });
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();

  const hasChildren = !!item.children;

  const handleOpenDropdownFloat = () => {
    const rect = menuRef.current.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom - 50,
    });
    setOpen((prev) => !prev);
  };

  if (hasChildren) {
    return (
      <>
        <NavDropdown ref={menuRef} onClick={() => handleOpenDropdownFloat()}>
          <NavDropdownInner>
            <item.icon size={20} />
            <NavContent>{item.label}</NavContent>
          </NavDropdownInner>

          {open ? (
            <NavDropdownIcon>
              <ChevronRight size={16} />
            </NavDropdownIcon>
          ) : (
            <NavDropdownIcon>
              <ChevronDown size={16} />
            </NavDropdownIcon>
          )}
        </NavDropdown>
        {open && (
          <NavDropdownContent top={menuPos.top}>
            {item.children.map((child) => (
              <NavList key={child.label} to={child.href} onClick={() => dispatch(closeNav())}>
                <NavDropdownContentItem>
                  {child.label}
                  {child.requiredPlan === "PREMIUM" && <PremiumSticker />}
                </NavDropdownContentItem>
              </NavList>
            ))}
          </NavDropdownContent>
        )}
      </>
    );
  }
  return (
    <NavList to={item.href} onClick={() => dispatch(closeNav())}>
      <item.icon size={20} />
      <NavContent>
        {item.label}
        {item.requiredPlan === "PREMIUM" && <PremiumSticker />}
        {item.badge && badgeMap[item.badge] > 0 && <NavBadge>{badgeMap[item.badge]}</NavBadge>}
      </NavContent>
    </NavList>
  );
};

export default NavItem;

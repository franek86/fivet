import { useSelector } from "react-redux";
import styled from "styled-components";

import { useUser } from "../../hooks/useAuth.js";

import { navLinks } from "../../features/navigation/navConfig.js";

import NavItem from "./NavItem.jsx";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Nav() {
  const { data: user } = useUser();

  const activeUserCount = useSelector((state) => state.realtime.activeUserCount);
  const badgeMap = { activeUsers: activeUserCount };
  return (
    <StyledNav>
      {navLinks
        .filter((item) => item.allowRoles.includes(user.role))
        .map((item) => (
          <NavItem key={item.label} item={item} badgeMap={badgeMap} />
        ))}
    </StyledNav>
  );
}

export default Nav;

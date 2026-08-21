import { useSelector } from "react-redux";
import styled from "styled-components";

import { useUser } from "../../hooks/useAuth.js";

import NavItem from "./NavItem.jsx";
import { useAdminSocket } from "../../hooks/useAdminSocket.js";
import { useGetAllUserProfile } from "../../hooks/useProfile.js";
import { getNavigationForRole } from "../../config/nav/index.js";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Nav() {
  const { data: user } = useUser();
  const { data: users } = useGetAllUserProfile();
  const navLinks = getNavigationForRole(user.role);

  useAdminSocket();

  const onlineCount = users?.filter((u) => u.online).length;

  const badgeValues = {
    onlineCount,
  };

  return (
    <StyledNav>
      {navLinks.map((item) => {
        const badgeValue = item.badge ? badgeValues[item.badge] : undefined;
        return <NavItem key={item.label} item={item} badgeMap={badgeValue} />;
      })}
    </StyledNav>
  );
}

export default Nav;

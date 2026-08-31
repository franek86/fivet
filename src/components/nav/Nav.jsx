import { useSelector } from "react-redux";
import styled from "styled-components";

import { useUser } from "../../hooks/useAuth.js";

import NavItem from "./NavItem.jsx";
import { useAdminSocket } from "../../hooks/useAdminSocket.js";
import { useGetUserProfile } from "../../hooks/useProfile.js";
import { getNavigationForRole } from "../../config/nav/index.js";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Nav() {
  const { data: user } = useUser();
  const { data: usersData } = useGetUserProfile();
  const navLinks = getNavigationForRole(user.role);

  useAdminSocket();

  const onlineCount = usersData?.users?.filter((u) => u.online).length;

  const badgeValues = {
    onlineCount,
  };

  return (
    <StyledNav>
      {navLinks.map((item) => {
        const badgeValue = item.badge ? badgeValues[item.badge] : undefined;
        return <NavItem key={item.label} item={item} badgeMap={badgeValues} />;
      })}
    </StyledNav>
  );
}

export default Nav;

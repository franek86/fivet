import { useSelector } from "react-redux";
import styled from "styled-components";

import { useUser } from "../../hooks/useAuth.js";

import { navLinks } from "../../features/navigation/navConfig.js";

import NavItem from "./NavItem.jsx";
import { useAdminSocket } from "../../hooks/useAdminSocket.js";
import { useGetAllUserProfile } from "../../hooks/useProfile.js";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Nav() {
  const { data: user } = useUser();
  const { data: users } = useGetAllUserProfile();

  console.log(users);

  useAdminSocket();

  const onlineCount = users?.filter((u) => u.online).length;

  const badgeValues = {
    onlineCount,
  };

  return (
    <StyledNav>
      {navLinks
        .filter((item) => item.allowRoles.includes(user.role))
        .map((item) => {
          const badgeValue = item.badge ? badgeValues[item.badge] : undefined;
          return <NavItem key={item.label} item={item} badgeMap={badgeValue} />;
        })}
    </StyledNav>
  );
}

export default Nav;

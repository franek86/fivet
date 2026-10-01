import { useSelector } from "react-redux";

import UserProfileList from "../../components/profile/UserProfileList.jsx";
import Title from "../../components/ui/Title.jsx";
import Unauthorized from "../Unauthorized.jsx";

import styled from "styled-components";
import { useUser } from "../../hooks/useAuth.js";
import UsersSearch from "../../components/profile/UsersSearch.jsx";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

function Users() {
  const { data: user } = useUser();

  const admin = user?.role === "ADMIN";

  if (!admin) return <Unauthorized />;
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Users</Title>
        <div className='search-container-right'>
          <UsersSearch />
        </div>
      </div>
      <UserProfileList />
    </>
  );
}

export default Users;

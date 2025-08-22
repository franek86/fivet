import { useSelector } from "react-redux";

import UserProfileList from "../components/profile/UserProfileList.jsx";
import Title from "../components/ui/Title.jsx";
import Unauthorized from "./Unauthorized.jsx";
import SearchBar from "../components/SearchBar.jsx";
import styled from "styled-components";

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
  const admin = useSelector((state) => state.auth.role === "ADMIN");

  if (!admin) return <Unauthorized />;
  return (
    <>
      <Flex>
        <Title tag='h1'>Users</Title>
        <SearchBar />
      </Flex>
      <UserProfileList />
    </>
  );
}

export default Users;

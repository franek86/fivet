import { useSelector } from "react-redux";

import UserProfileList from "../components/profile/UserProfileList.jsx";
import Title from "../components/ui/Title.jsx";
import Unauthorized from "./Unauthorized.jsx";

function Users() {
  const admin = useSelector((state) => state.auth.role === "admin");

  if (!admin) return <Unauthorized />;
  return (
    <>
      <Title tag='h1'>Users</Title>
      <UserProfileList />
    </>
  );
}

export default Users;

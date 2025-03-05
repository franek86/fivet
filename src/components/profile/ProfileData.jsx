import { useSelector } from "react-redux";
import { useProfileData } from "../../hooks/useProfile.js";

import Spinner from "../Spinner.jsx";

function ProfileData() {
  const { data, isLoading } = useProfileData();

  if (isLoading) return <Spinner />;
  const { first_name, last_name, avatar, email } = data;
  return (
    <>
      {avatar ? avatar : <p>slika</p>}
      <p>First name: {first_name}</p>
      <p>Last name: {last_name}</p>
      <p>Email: {email}</p>
    </>
  );
}

export default ProfileData;

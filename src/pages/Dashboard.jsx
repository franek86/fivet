import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Title from "../components/ui/Title.jsx";

import { useProfileData } from "../hooks/useProfile.js";
import { setProfile } from "../slices/profileSlice.js";

function Dashboard() {
  const dispatch = useDispatch();
  const { data: profile, isSuccess } = useProfileData();

  useEffect(() => {
    if (isSuccess && profile) {
      dispatch(
        setProfile({
          firstName: profile.first_name,
          lastName: profile.last_name,
          avatar: profile.avatar,
        })
      );
    }
  }, [dispatch, profile, isSuccess]);
  console.log(profile);
  return <Title tag='h1'>Dashboard</Title>;
}

export default Dashboard;

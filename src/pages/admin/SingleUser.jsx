import React from "react";
import { useParams } from "react-router";
import SingleProfileData from "../../components/profile/SingleUserProfile/SingleProfileData.jsx";

const SingleUser = () => {
  const { id } = useParams();
  return <SingleProfileData />;
};

export default SingleUser;

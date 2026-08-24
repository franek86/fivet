import React from "react";
import DashboardWelcome from "../../components/dashboard/DashboardWelcome.jsx";
import { useUser } from "../../hooks/useAuth.js";

const BuyerDashboard = () => {
  const { data: user } = useUser();
  return (
    <>
      <DashboardWelcome user={user} />
    </>
  );
};

export default BuyerDashboard;

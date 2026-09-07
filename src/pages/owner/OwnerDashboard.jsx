import React from "react";

import DashboardWelcome from "../../components/dashboard/DashboardWelcome.jsx";
import { useUser } from "../../hooks/useAuth.js";
import OwnerDahsboardStatistic from "../../components/dashboard/owner/OwnerDahsboardStatistic.jsx";

const OwnerDashboard = () => {
  const { data: user } = useUser();

  return (
    <>
      <DashboardWelcome user={user} />
      <OwnerDahsboardStatistic />
    </>
  );
};

export default OwnerDashboard;

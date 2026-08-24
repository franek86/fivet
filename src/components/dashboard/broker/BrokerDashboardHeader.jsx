import React from "react";
import DashboardWelcome from "../DashboardWelcome.jsx";
import { useUser } from "../../../hooks/useAuth.js";

const BrokerDashboardHeader = () => {
  const { data: user } = useUser();

  return (
    <div>
      <DashboardWelcome user={user} />
    </div>
  );
};

export default BrokerDashboardHeader;

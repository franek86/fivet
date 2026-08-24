import React from "react";
import BrokerDashboardHeader from "../../components/dashboard/broker/BrokerDashboardHeader.jsx";
import VerificationGate from "../VerificationGate.jsx";

const BrokerDashboard = () => {
  return (
    <div>
      <VerificationGate />
      <BrokerDashboardHeader />
    </div>
  );
};

export default BrokerDashboard;

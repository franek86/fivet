import { useSelector } from "react-redux";

import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import MapChart from "../components/dashboard/MapChart.jsx";
import Earnings from "../components/dashboard/Earnings.jsx";

import { useDashboardData } from "../hooks/useDashboardStatistic.js";
import { useUser } from "../hooks/useAuth.js";
import { useState } from "react";

const TwoColumnsRole = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media screen and (min-width: 1200px) {
    grid-template-columns: ${({ $role }) => ($role === "ADMIN" ? "1fr 1fr" : "1fr")};
  }
`;

function Dashboard() {
  const { data: user } = useUser();
  const [activePeriod, setActivePeriod] = useState("week");

  const { data, isLoading } = useDashboardData(activePeriod);

  const handlePeriodTab = (currentPeriod) => {
    setActivePeriod(currentPeriod);
  };

  return (
    <>
      <Title tag='h1'>Dashboard</Title>

      <>
        <StatisticBox data={data?.statistic} isLoading={isLoading} />

        {user.role === "ADMIN" && (
          <>
            <Earnings data={data?.earnings} isLoading={isLoading} activePeriod={activePeriod} onChangePeriod={handlePeriodTab} />

            {/*  <SubcriptionChart data={data} isLoading={isLoading} /> */}
            <MapChart geoUrl={data.geoUrl} isLoading={isLoading} />
          </>
        )}
        <TwoColumnsRole $role={user.role}>
          <TopShips data={data?.statistic} isLoading={isLoading} />
          {user.role === "ADMIN" && <LastUsers data={data?.statistic} isLoading={isLoading} />}
        </TwoColumnsRole>
      </>
    </>
  );
}

export default Dashboard;

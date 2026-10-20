import { lazy, Suspense } from "react";
import styled from "styled-components";

import LastUsers from "../../components/dashboard/LastUsers.jsx";
import StatisticBox from "../../components/dashboard/StatisticBox.jsx";
import TopShips from "../../components/dashboard/TopShips.jsx";
import Earnings from "../../components/dashboard/Earnings.jsx";
import DashboardWelcome from "../../components/dashboard/DashboardWelcome.jsx";
import LastBlogs from "../../components/dashboard/LastBlogs.jsx";

const MapChart = lazy(() => import("../../components/dashboard/MapChart.jsx"));

import { useAdminDashboardData, useAdminEarningsData } from "../../hooks/useDashboardStatistic.js";
import { useUser } from "../../hooks/useAuth.js";

function AdminDashboard() {
  const { data: statistics, isLoading: isStatisticLoading } = useAdminDashboardData();
  const { data: earnings, isLoading: isEarningsLoading } = useAdminEarningsData();

  const { data: user } = useUser();

  console.log(statistics);

  return (
    <>
      <>
        <DashboardWelcome user={user} />
      </>

      <>
        <StatisticBox data={statistics?.totals} isLoading={isStatisticLoading} />

        <TwoColumnGrid>
          {/* 
          <Earnings data={earnings} isLoading={isEarningsLoading} /> */}
        </TwoColumnGrid>

        <ThreeColumnGrid>
          <TopShips data={statistics?.popularShips} isLoading={isStatisticLoading} />
          <LastUsers data={statistics?.recentUsers} isLoading={isStatisticLoading} />
          <LastBlogs data={statistics?.recentBlogs} isLoading={isStatisticLoading} />
        </ThreeColumnGrid>

        <Suspense fallback={<div></div>}>
          <MapChart />
        </Suspense>
      </>
    </>
  );
}

export default AdminDashboard;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

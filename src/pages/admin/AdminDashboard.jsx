import { lazy, Suspense } from "react";
import styled from "styled-components";

import LastUsers from "../../components/dashboard/LastUsers.jsx";
import StatisticBox from "../../components/dashboard/StatisticBox.jsx";
import TopShips from "../../components/dashboard/TopShips.jsx";
import Earnings from "../../components/dashboard/Earnings.jsx";
import DashboardWelcome from "../../components/dashboard/DashboardWelcome.jsx";
import LastBlogs from "../../components/dashboard/LastBlogs.jsx";

const MapChart = lazy(() => import("../../components/dashboard/MapChart.jsx"));

import { useAdminDashboardData } from "../../hooks/useDashboardStatistic.js";
import { useUser } from "../../hooks/useAuth.js";

function AdminDashboard() {
  const { data: statistics, isLoading: isStatisticLoading } = useAdminDashboardData();

  const { data: user } = useUser();

  return (
    <>
      <>
        <DashboardWelcome user={user} />
      </>

      <>
        <StatisticBox data={statistics?.totals} isLoading={isStatisticLoading} />

        <TwoColumnGrid>
          <Earnings />
        </TwoColumnGrid>

        <ThreeColumnGrid>
          <TopShips data={statistics?.popularShips} isLoading={isStatisticLoading} />
          <LastBlogs data={statistics?.recentBlogs} isLoading={isStatisticLoading} />
          <LastUsers data={statistics?.recentUsers} isLoading={isStatisticLoading} />
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
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  &:nth-last-of-type() {
    background-color: red;
  }

  @media (min-width: 968px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

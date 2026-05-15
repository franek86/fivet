import { lazy, Suspense } from "react";

import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";

import Earnings from "../components/dashboard/Earnings.jsx";

const MapChart = lazy(() => import("../components/dashboard/MapChart.jsx"));

import { useAdminDashboardData, useGeoWorldData } from "../hooks/useDashboardStatistic.js";

const TwoColumnsRole = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 20px 0;

  @media screen and (min-width: 1200px) {
    grid-template-columns: 2fr 1fr;
  }
`;

function AdminDashboard() {
  const { data, isStatisticLoading, isEarningsLoading } = useAdminDashboardData();
  const { data: geoData, isLoading: isGeoLoading } = useGeoWorldData();

  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Dashboard</Title>
      </div>

      <>
        <StatisticBox data={data?.statistic} isLoading={isStatisticLoading} />
        <TwoColumnsRole>
          <Earnings data={data?.earnings} isLoading={isEarningsLoading} />
          <TopShips data={data?.statistic} isLoading={isStatisticLoading} />
        </TwoColumnsRole>

        <TwoColumnsRole>
          <LastUsers data={data?.statistic} isLoading={isStatisticLoading} />
        </TwoColumnsRole>
        {/*  <SubcriptionChart data={data} isLoading={isLoading} /> */}
        <Suspense fallback={<div></div>}>
          <MapChart geoUrl={geoData} isLoading={isGeoLoading} />
        </Suspense>
      </>
    </>
  );
}

export default AdminDashboard;

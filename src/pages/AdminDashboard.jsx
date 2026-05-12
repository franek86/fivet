import { useState } from "react";

import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import MapChart from "../components/dashboard/MapChart.jsx";
import Earnings from "../components/dashboard/Earnings.jsx";

import { useAdminDashboardData } from "../hooks/useDashboardStatistic.js";

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
  const { data, isLoading } = useAdminDashboardData();

  console.log(data);

  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Dashboard</Title>
      </div>

      <>
        <StatisticBox data={data?.statistic} isLoading={isLoading} />
        <TwoColumnsRole>
          <Earnings data={data?.earnings} isLoading={isLoading} />
          <TopShips data={data?.statistic} isLoading={isLoading} />
        </TwoColumnsRole>

        <TwoColumnsRole>
          <LastUsers data={data?.statistic} isLoading={isLoading} />
        </TwoColumnsRole>
        {/*  <SubcriptionChart data={data} isLoading={isLoading} /> */}
        <MapChart geoUrl={data?.geoUrl} isLoading={isLoading} />
      </>
    </>
  );
}

export default AdminDashboard;

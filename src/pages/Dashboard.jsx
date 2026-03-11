import { useSelector } from "react-redux";

import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import MapChart from "../components/dashboard/MapChart.jsx";
import Earnings from "../components/dashboard/Earnings.jsx";

import { useDashboardStatistic } from "../hooks/useDashboardStatistic.js";

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
  const role = useSelector((state) => state.auth.role);
  const { data, isLoading } = useDashboardStatistic();

  return (
    <>
      <Title tag='h1'>Dashboard</Title>

      <>
        <StatisticBox data={data} isLoading={isLoading} />

        {role === "ADMIN" && (
          <>
            <Earnings />

            {/*  <SubcriptionChart data={data} isLoading={isLoading} /> */}
            <MapChart />
          </>
        )}
        <TwoColumnsRole $role={role}>
          <TopShips data={data} isLoading={isLoading} />
          {role === "ADMIN" && <LastUsers data={data} isLoading={isLoading} />}
        </TwoColumnsRole>
      </>
    </>
  );
}

export default Dashboard;

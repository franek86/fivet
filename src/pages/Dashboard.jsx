import { useSelector } from "react-redux";

import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import DashboardChart from "../components/dashboard/DashboardChart.jsx";
import SubcriptionChart from "../components/dashboard/SubscriptionChart.jsx";
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

const TwoColumns = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
  height: 500px;

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
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
        <TwoColumnsRole $role={role}>
          <TopShips data={data} isLoading={isLoading} />
          {role === "ADMIN" && <LastUsers data={data} isLoading={isLoading} />}
        </TwoColumnsRole>
        {role === "ADMIN" && (
          <TwoColumns>
            <DashboardChart data={data} isLoading={isLoading} />
            <SubcriptionChart data={data} isLoading={isLoading} />
          </TwoColumns>
        )}
      </>
    </>
  );
}

export default Dashboard;

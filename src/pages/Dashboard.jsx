import { useSelector } from "react-redux";
import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import DashboardChart from "../components/dashboard/DashboardChart.jsx";

const TwoColumns = styled.article`
  display: grid;
  grid-template-columns: ${({ $role }) => ($role === "ADMIN" ? "250px 1fr" : "1fr")};
  gap: 2rem;
  margin-top: 3rem;
`;

function Dashboard() {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <Title tag='h1'>Dashboard</Title>
      <StatisticBox />
      <TopShips />
      <TwoColumns $role={role}>
        <DashboardChart />
        {role === "ADMIN" && <LastUsers />}
      </TwoColumns>
    </>
  );
}

export default Dashboard;

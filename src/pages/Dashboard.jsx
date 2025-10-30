import { useSelector } from "react-redux";
import LastUsers from "../components/dashboard/LastUsers.jsx";
import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import DashboardChart from "../components/dashboard/DashboardChart.jsx";
import { useIsFetching } from "@tanstack/react-query";
import Spinner from "../components/Spinner.jsx";
import Subscribe from "../components/StrapiTestBtn.jsx";

const TwoColumns = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 3rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: ${({ $role }) => ($role === "ADMIN" ? "250px 1fr" : "1fr")};
    gap: 2rem;
  }
`;

function Dashboard() {
  const role = useSelector((state) => state.auth.role);
  const isFetchingStatistic = useIsFetching({ queryKey: ["statistic"] });
  const isFetchingLastUsers = useIsFetching({ queryKey: ["all-profile"] });

  const isLoading = isFetchingLastUsers + isFetchingStatistic > 0;

  return (
    <>
      <Title tag='h1'>Dashboard</Title>
      <Subscribe />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StatisticBox />
          <TopShips />
          <TwoColumns $role={role}>
            <DashboardChart />
            {role === "ADMIN" && <LastUsers />}
          </TwoColumns>
        </>
      )}
    </>
  );
}

export default Dashboard;

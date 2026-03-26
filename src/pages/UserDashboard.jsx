import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import { useUserDashboardData } from "../hooks/useDashboardStatistic.js";
import StatisticCard from "../components/ui/StatisticCard.jsx";
import { CalendarDays, CheckCheck, Ship } from "lucide-react";
import TablePlaceholder from "../components/ui/TablePlaceholder.jsx";

const StatisticBoxWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-top: 2.8rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TwoColumnsRole = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media screen and (min-width: 1200px) {
    grid-template-columns: "1fr";
  }
`;

function UserDashboard() {
  const { data, isLoading } = useUserDashboardData();

  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  return (
    <>
      <Title tag='h1'>Dashboard</Title>

      <StatisticBoxWrap>
        <StatisticCard
          iconColor='#0369a1'
          icon={<Ship />}
          text='Total ships'
          data={data?.totalShips}
          trend={data?.userShipsTrend?.trend}
          trendChange={data?.userShipsTrend?.change}
        />
        <StatisticCard
          iconColor='#15803d'
          icon={<CheckCheck />}
          text='Published ships'
          data={data?.totalPublishedShips}
          trend={data?.userPublishedTrend?.trend}
          trendChange={data?.userPublishedTrend?.change}
        />
        <StatisticCard
          iconColor='#4338ca'
          icon={<CalendarDays />}
          text='Events'
          data={data?.totalEvents}
          trend={data?.eventsTrend?.trend}
          trendChange={data?.eventsTrend?.change}
        />
      </StatisticBoxWrap>
      <TwoColumnsRole>
        <TopShips data={data} isLoading={isLoading} />
      </TwoColumnsRole>
    </>
  );
}

export default UserDashboard;

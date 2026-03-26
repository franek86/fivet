import styled from "styled-components";

import StatisticCard from "../ui/StatisticCard.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import { CalendarDays, Ship, Users, CheckCheck } from "lucide-react";

import { useUser } from "../../hooks/useAuth.js";

const StatisticBoxWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-top: 2.8rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

function StatisticBox({ data, isLoading }) {
  const { data: user } = useUser();

  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  return (
    <StatisticBoxWrap>
      <StatisticCard
        iconColor='#0369a1'
        icon={<Ship />}
        text='Total ships'
        data={data.totalShips}
        trend={data?.shipsTrend?.trend}
        trendChange={data?.shipsTrend?.change}
      />

      <StatisticCard
        iconColor='#15803d'
        icon={<Users />}
        text='Total users'
        data={data?.totalUsers}
        trend={data?.usersTrend?.trend}
        trendChange={data?.usersTrend?.change}
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
  );
}

export default StatisticBox;

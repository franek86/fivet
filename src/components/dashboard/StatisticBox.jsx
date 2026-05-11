/**
 * Third-party libraries
 */
import styled from "styled-components";
import { CalendarDays, Ship, Users } from "lucide-react";

/**
 * Custom hooks
 */
import { useUser } from "../../hooks/useAuth.js";

/**
 * UI Components
 */
import StatisticCard from "../ui/StatisticCard.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const StatisticBoxWrap = styled.section`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
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
        icon={<Ship />}
        text='Total ships'
        data={data.totalShips}
        trend={data?.shipsTrend?.trend}
        trendChange={data?.shipsTrend?.change}
      />

      <StatisticCard
        icon={<Users />}
        text='Total users'
        data={data?.totalUsers}
        trend={data?.usersTrend?.trend}
        trendChange={data?.usersTrend?.change}
      />

      <StatisticCard
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

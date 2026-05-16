/**
 * Third-party libraries
 */
import styled from "styled-components";
import { BookOpenCheck, CalendarDays, Ship, Users } from "lucide-react";

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
  console.log(data);
  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  return (
    <StatisticBoxWrap>
      <StatisticCard
        icon={<Ship />}
        text='Total ships'
        data={data?.totalShips}
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

      <StatisticCard
        icon={<BookOpenCheck />}
        text='Blogs'
        data={data?.totalBlogs}
        trend={data?.blogsTrend?.trend}
        trendChange={data?.blogsTrend?.change}
      />
    </StatisticBoxWrap>
  );
}

export default StatisticBox;

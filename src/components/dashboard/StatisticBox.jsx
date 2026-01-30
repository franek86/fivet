import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import StatisticCard from "../ui/StatisticCard.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";
import { CalendarDays, Ship, Users } from "lucide-react";

const StatisticBoxWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2.8rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

function StatisticBox({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  return (
    <StatisticBoxWrap>
      <StatisticCard iconColor='#0369a1' icon={<Ship />} text='Total ships' data={data?.totalShips} />
      <StatisticCard iconColor='#15803d' icon={<Users />} text='Total users' data={data?.totalUsers} />
      <StatisticCard iconColor='#4338ca' icon={<CalendarDays />} text='Events' data={data?.totalEvents} />
    </StatisticBoxWrap>
  );
}

export default StatisticBox;

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { FaUsers, FaShip, FaCalendarAlt } from "react-icons/fa";
import StatisticCard from "../ui/StatisticCard.jsx";

import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";

const StatisticBoxWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2.8rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

function StatisticBox() {
  const { data, isError } = useDashboardStatistic();

  if (isError) return <div>Error</div>;

  return (
    <StatisticBoxWrap>
      <StatisticCard iconColor='#15803d' icon={<FaUsers />} text='Total users' data={data?.totalUsers} />
      <StatisticCard iconColor='#0369a1' icon={<FaShip />} text='Total ships' data={data?.totalShips} />
      <StatisticCard iconColor='#4338ca' icon={<FaCalendarAlt />} text='Events' data={data?.totalEvents} />
    </StatisticBoxWrap>
  );
}

export default StatisticBox;

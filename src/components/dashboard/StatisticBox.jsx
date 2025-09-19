import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { FaUsers, FaShip, FaCalendarAlt } from "react-icons/fa";
import StatisticCard from "../ui/StatisticCard.jsx";
import Spinner from "../Spinner.jsx";

import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";

const StatisticBoxWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2.8rem;
`;

function StatisticBox() {
  const { data, isFetching, isError } = useDashboardStatistic();

  if (isFetching) return <Spinner />;
  if (isError) return <div>Error</div>;

  const { totalShips, totalUsers, totalEvents } = data;

  return (
    <StatisticBoxWrap>
      <StatisticCard iconColor='#15803d' icon={<FaUsers />} text='Total users' data={totalUsers} />
      <StatisticCard iconColor='#0369a1' icon={<FaShip />} text='Total ships' data={totalShips} />
      <StatisticCard iconColor='#4338ca' icon={<FaCalendarAlt />} text='Events' data={totalEvents} />
    </StatisticBoxWrap>
  );
}

export default StatisticBox;

import styled from "styled-components";

import StatisticCard from "../ui/StatisticCard.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import { CalendarDays, Ship, Users, CheckCheck } from "lucide-react";
import { useSelector } from "react-redux";

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
  const userRole = useSelector((state) => state.auth.role);

  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  const getStatisticByRole = (data, key, role) => {
    if (role === "ADMIN") {
      return data[key] ?? 0;
    }

    const personalStats = data.userStats?.[0];
    return personalStats?.[key] ?? 0;
  };

  // Total Ships
  const totalShips = getStatisticByRole(data, "totalShips", userRole);
  const shipsTrend = userRole === "ADMIN" ? data?.shipsTrend?.trend : data?.userStats?.[0]?.trends?.ships.trend;
  const shipChange = userRole === "ADMIN" ? data?.shipsTrend?.change : data?.userStats?.[0]?.trends?.ships.change;

  return (
    <StatisticBoxWrap>
      <StatisticCard iconColor='#0369a1' icon={<Ship />} text='Total ships' data={totalShips} trend={shipsTrend} trendChange={shipChange} />
      {userRole === "ADMIN" && (
        <StatisticCard
          iconColor='#15803d'
          icon={<Users />}
          text='Total users'
          data={data?.totalUsers}
          trend={data?.usersTrend?.trend}
          trendChange={data?.usersTrend?.change}
        />
      )}
      {userRole === "USER" && <StatisticCard iconColor='#15803d' icon={<CheckCheck />} text='Published ships' data={data?.totalUsers} />}

      <StatisticCard iconColor='#4338ca' icon={<CalendarDays />} text='Events' data={getStatisticByRole(data, "totalEvents", userRole)} />
    </StatisticBoxWrap>
  );
}

export default StatisticBox;

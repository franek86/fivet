import { Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";
import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import { useMemo } from "react";

const Wrapper = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const dataDummy = [
  {
    name: "Total ships",
    uv: 31.47,
    fill: "#8884d8",
  },
  {
    name: "Total users",
    uv: 26.69,
    fill: "#83a6ed",
  },
];

const COLORS = ["#0088FE", "#00C49F"];
const userStatsToChartData = (totalUsers = 0, totalShips = 0) => [
  { name: "Users", value: totalUsers, fill: COLORS[0] },
  { name: "Ships", value: totalShips, fill: COLORS[1] },
];

/* const userStatsToChartData = (stats) => {
  Object.entries(stats).map(([key, value], index) => ({
    name: key,
    value,
    fill: COLORS[index % COLORS.length],
  }));
}; */

function DashboardChart({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  const userStats = useMemo(() => userStatsToChartData(data?.totalUsers, data?.totalShips), [data?.totalUsers, data?.totalShips]);
  console.log(userStats);
  return (
    <Wrapper>
      <ResponsiveContainer width='100%' height='100%'>
        <RadialBarChart cx='50%' cy='50%' innerRadius='40%' outerRadius='100%' data={userStats}>
          <Legend height={100} layout='horizontal' verticalAlign='top' align='right' />
          <RadialBar background dataKey='value' />
        </RadialBarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default DashboardChart;

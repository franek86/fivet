import { Bar, BarChart, CartesianGrid, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import { useMemo } from "react";
import { formatMonth } from "../../utils/formatMonth.js";

const Wrapper = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

function DashboardChart({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  const chartData = data.monthlyStats.map((item) => ({
    month: formatMonth(item.month, "EN"),
    users: item.users,
    ships: item.ships,
  }));

  return (
    <Wrapper>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={chartData}>
          <Legend
            layout='horizontal'
            align='right'
            verticalAlign='top'
            wrapperStyle={{
              fontSize: 12,
              paddingBottom: 12,
            }}
          />
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tick={{ fontSize: 12 }} />
          <YAxis width='auto' tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey='users' fill='#4f39f6' isAnimationActive={true} />
          <Bar dataKey='ships' fill='#0088fe' isAnimationActive={true} /> */
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default DashboardChart;

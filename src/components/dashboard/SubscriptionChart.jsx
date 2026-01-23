"use client";
import { Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import styled from "styled-components";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import { useMemo } from "react";

const Section = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0369a1", "#b91c1c", "#15803d"];

const subscriptionStatsToChartData = (stats) =>
  Object.entries(stats).map(([key, value], index) => ({
    name: key,
    value,
    fill: COLORS[index % COLORS.length],
  }));

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor={x > ncx ? "start" : "end"} dominantBaseline='central'>
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export default function SubcriptionChart({ isAnimationActive = true, data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={6} />;
  }

  const chartData = useMemo(() => subscriptionStatsToChartData(data?.subscriptionStats), [data?.subscriptionStats]);

  return (
    <Section>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={chartData}
            labelLine={false}
            label={renderCustomizedLabel}
            fill='#8884d8'
            dataKey='value'
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
          />
          <Legend layout='horizontal' align='right' verticalAlign='top' />
        </PieChart>
      </ResponsiveContainer>
    </Section>
  );
}

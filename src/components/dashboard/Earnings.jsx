import { useState } from "react";
/**
 * Third-party libraries
 */
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import styled from "styled-components";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import { useAdminRevenueData } from "../../hooks/useDashboardStatistic.js";
import Title from "../ui/Title.jsx";

const periods = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

function Earnings() {
  const [period, setPeriod] = useState("weekly");

  const { data, isLoading } = useAdminRevenueData(period);

  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <section className='card-container'>
      <div className='card-header'>
        <Title tag='h5'>Eranings</Title>
        <Tabs>
          {periods?.map((item) => (
            <Tab key={item.value} onClick={() => setPeriod(item.value)} $active={period === item.value}>
              {item.label.toUpperCase()}
            </Tab>
          ))}
        </Tabs>
      </div>
      {data.totalRevenue > 0 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data.points} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke='#d9e2ec' strokeDasharray='4 4' vertical={false} />

              <XAxis dataKey='date' tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={24} />

              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} width={55} />

              <Tooltip
                formatter={(value) => [
                  new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: data.currency,
                  }).format(Number(value)),
                  "Revenue",
                ]}
              />

              <Line type='monotone' dataKey='revenue' stroke='#1769aa' strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <strong>No revenue recorded yet. Revenue will appear here once payments have been completed.</strong>
      )}
    </section>
  );
}

export default Earnings;

const Tabs = styled.div`
  display: flex;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  background-color: var(--color-grey-200);
  margin-top: 10px;
`;

const Tab = styled.div`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? "var(--color-bg)" : "transparent")};
  border-radius: var(--border-radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
`;

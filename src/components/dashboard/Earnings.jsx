import { useState } from "react";
/**
 * Third-party libraries
 */
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import styled from "styled-components";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

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
  background-color: ${({ $active }) => ($active ? "var(--color-white)" : "transparent")};
  border-radius: var(--border-radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
`;

function Earnings({ data, isLoading }) {
  const [range, setRange] = useState("months");
  const dataTest = data?.earningsData[range];

  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <section className='card-container'>
      <div className='card-header'>
        <h3>Earnings</h3>
        <Tabs>
          {["weeks", "months", "year"].map((r) => (
            <Tab onClick={() => setRange(r)} key={r} $active={range === r}>
              {r.toUpperCase()}
            </Tab>
          ))}
        </Tabs>
      </div>
      <div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={dataTest} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id='g1' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='var(--color-accent-600)' stopOpacity={0.5} />
                  <stop offset='100%' stopColor='var(--color-accent)' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke='var(--color-border)' vertical={false} />
              <XAxis dataKey='name' stroke='var(--color-text-muted)' fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke='var(--color-text-muted)' fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: 10 }} />
              <Area type='monotone' dataKey='v' stroke='var(--color-accent-600)' strokeWidth={2.5} fill='url(#g1)' />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default Earnings;

import { Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";
import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";

const Wrapper = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const data = [
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

function DashboardChart() {
  const test = useDashboardStatistic();
  console.log(test.data);

  return (
    <Wrapper>
      <ResponsiveContainer>
        <RadialBarChart cx='50%' cy='50%' innerRadius='40%' outerRadius='100%' data={data}>
          <RadialBar background dataKey='uv' />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align='right' />
        </RadialBarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default DashboardChart;

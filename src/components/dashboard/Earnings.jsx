import { useState } from "react";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useDashboardEarnings } from "../../hooks/useDashboardStatistic.js";
import styled from "styled-components";

const Tabs = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.1rem;
`;

const Tab = styled.div`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? "#0ea5e9" : "#9ca3af")};
  border-radius: var(--border-radius-md);
  color: var(--color-grey-50);
  margin-bottom: 1rem;
  cursor: pointer;
`;

const TabContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const TabCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.8rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
`;

const TabCardValue = styled.div`
  font-size: 3rem;
  font-weight: 600;
  background: var(--bg-linear-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-weight: normal;
    margin-right: 0.5rem;
  }
`;

const TrendBadge = styled.div`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $up, $down }) => ($up ? "#16a34a" : $down ? "#dc2626" : "#6b7280")};
`;

const TrendValue = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ $up, $down }) => ($up ? "#16a34a" : $down ? "#dc2626" : "#6b7280")};
`;

const IconStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  p {
    font-size: 1.2rem;
  }
`;

const IconStyleUp = styled(TrendingUp)`
  color: var(--color-green-700);
`;

const IconStyleDown = styled(TrendingDown)`
  color: var(--color-red-800);
`;

const IconStyleMinus = styled(Minus)`
  color: #6b7280;
`;

function Earnings() {
  const period = ["week", "month", "year"];
  const [activePeriod, setActivePeriod] = useState("week");

  const { data, isLoading } = useDashboardEarnings(activePeriod);

  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  const handlePeriodTab = (currentPeriod) => {
    setActivePeriod(currentPeriod);
  };

  const trend = data?.trend;
  const isUp = trend.value > 0;
  const isDown = trend.value < 0;
  const isSame = trend.value === 0;

  return (
    <div>
      <h3>Earning</h3>
      <Tabs>
        {period.map((p, index) => (
          <Tab onClick={() => handlePeriodTab(p)} key={index} $active={activePeriod === p}>
            {p}
          </Tab>
        ))}
      </Tabs>

      <TabContent>
        {data?.period === activePeriod &&
          data?.data.map((d) =>
            Object.entries(d.subscriptions).map(([type, value]) => (
              <TabCard key={`${d.label}-${type}`}>
                <p>{type}</p>
                <TabCardValue>
                  <span>$</span>
                  {value}
                </TabCardValue>
                {trend && (
                  <TrendBadge $up={isUp} $down={isDown}>
                    <IconStyle>
                      {isUp && <IconStyleUp size={25} />}
                      {isDown && <IconStyleDown size={25} />}
                      {isSame && <IconStyleMinus size={25} />}
                      <TrendValue $up={isUp} $down={isDown}>
                        {Math.abs(trend.value)}%
                      </TrendValue>
                      <p> Last {trend.windowDays} days</p>
                    </IconStyle>
                  </TrendBadge>
                )}
              </TabCard>
            )),
          )}
      </TabContent>
    </div>
  );
}

export default Earnings;

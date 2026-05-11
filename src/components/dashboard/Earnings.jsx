/**
 * Third-party libraries
 */
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
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
`;

const Tab = styled.div`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? "#fff" : "transparent")};
  border-radius: var(--border-radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
`;

const TabContent = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
`;

const TabCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.8rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
`;

const TabCardValue = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-text-muted);

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
  color: var(--color-success);
`;

const IconStyleDown = styled(TrendingDown)`
  color: var(--color-danger);
`;

const IconStyleMinus = styled(Minus)`
  color: #6b7280;
`;

function Earnings({ data, isLoading, activePeriod, onChangePeriod }) {
  const period = ["week", "month", "year"];

  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  const trend = data?.trend;
  const isUp = trend.value > 0;
  const isDown = trend.value < 0;
  const isSame = trend.value === 0;
  console.log(data);
  return (
    <section className='card-container'>
      <div className='card-header'>
        <h3>Earnings</h3>
        <Tabs>
          {period.map((p, index) => (
            <Tab onClick={() => onChangePeriod(p)} key={index} $active={activePeriod === p}>
              {p}
            </Tab>
          ))}
        </Tabs>
      </div>
      <div>
        <TabContent>
          {data?.period === activePeriod &&
            data?.data.map((d) =>
              Object.entries(d.subscriptions).map(([type, value]) => (
                <TabCard key={`${d.label}-${type}`}>
                  <p>{type}</p>
                  <TabCardValue>${value}</TabCardValue>
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
      <div>{/*  <DashboardChart data={data} isLoading={isLoading} /> */}</div>
    </section>
  );
}

export default Earnings;

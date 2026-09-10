import { Anchor, Clock, ShieldCheck } from "lucide-react";
import styled from "styled-components";

const UserStatisticCard = ({ vessels, liveCount, pendingCount }) => {
  return (
    <Stats>
      <StatCard>
        <StatIcon>
          <Anchor />
        </StatIcon>

        <div>
          <StatValue>{vessels.length}</StatValue>
          <StatLabel>Total Vessels</StatLabel>
        </div>
      </StatCard>

      <StatCard>
        <StatIcon $success>
          <ShieldCheck />
        </StatIcon>

        <div>
          <StatValue>{liveCount}</StatValue>
          <StatLabel>Live on Marketplace</StatLabel>
        </div>
      </StatCard>

      <StatCard>
        <StatIcon $warning>
          <Clock />
        </StatIcon>

        <div>
          <StatValue>{pendingCount}</StatValue>
          <StatLabel>Awaiting Approval</StatLabel>
        </div>
      </StatCard>
    </Stats>
  );
};

export default UserStatisticCard;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 28px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 14px;
`;

export const StatIcon = styled.div`
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--color-bg);
  color: ${({ $success, $warning }) =>
    $success ? "var(--color-success-600)" : $warning ? "var(--color-warning-600)" : "var(--color-accent-600)"};
`;

export const StatValue = styled.div`
  color: var(--color-text);
  font-size: 21px;
  font-weight: 700;
`;

export const StatLabel = styled.div`
  margin-top: 2px;
  color: var(--color-text-muted);
  font-size: 14px;
`;

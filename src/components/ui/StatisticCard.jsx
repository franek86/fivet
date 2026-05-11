import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-md);
  padding: 20px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
`;

const BoxIcon = styled.span`
  display: grid;
  place-items: center;
  color: var(--color-text);
  border-radius: 12px;
  background-color: var(--color-accent);
  width: 44px;
  height: 44px;
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  p {
    text-transform: uppercase;
  }
`;
const BoxNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .label {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .value {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
`;

const IconStyle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--color-grey-200);
`;

const P = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.trend === "up" ? "#16a34a" : props.trend === "down" ? "#dc2626" : "#6b7280")};
`;

const IconStyleUp = styled(ArrowUpRight)`
  color: var(--color-success);
`;

const IconStyleDown = styled(ArrowDownRight)`
  color: var(--color-danger);
`;

function StatisticCard({ text, icon, data, trend, trendChange }) {
  return (
    <Box>
      <BoxContent>
        <BoxIcon>{icon && icon}</BoxIcon>
        <IconStyle>
          {trend === "up" ? <IconStyleUp size={12} /> : <IconStyleDown size={12} />}
          <P trend={trend}>{trendChange}</P>
        </IconStyle>
      </BoxContent>
      <BoxNumber>
        <div>
          <p className='label'> {text && text}</p>
          <div className='value'> {data && data}</div>
        </div>
      </BoxNumber>
    </Box>
  );
}

export default StatisticCard;

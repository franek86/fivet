import { TrendingDown, TrendingUp } from "lucide-react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-shadow: var(--shadow-md);
  padding: 1.8rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-600);
`;

const BoxIcon = styled.div`
  color: ${(props) => (props.$iconColor ? props.$iconColor : "#4b5563")};
  border-radius: 50%;
  background-color: var(--color-grey-200);
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  p {
    text-transform: uppercase;
  }
`;
const BoxNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  p {
    font-size: 1.2rem;
  }
`;

const IconStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const P = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => (props.trend === "up" ? "#15803d" : props.trend === "down" ? "#991b1b" : "#6b7280")};
`;

const IconStyleUp = styled(TrendingUp)`
  color: var(--color-green-700);
`;

const IconStyleDown = styled(TrendingDown)`
  color: var(--color-red-800);
`;

function StatisticCard({ text, icon, iconColor, data, trend, trendChange }) {
  return (
    <Box>
      <BoxContent>
        <div>
          <p> {text && text}</p>
          <h2> {data && data}</h2>
        </div>

        <BoxIcon $iconColor={iconColor}>{icon && icon}</BoxIcon>
      </BoxContent>
      <BoxNumber>
        <IconStyle>
          {trend === "up" ? <IconStyleUp size={25} /> : <IconStyleDown size={25} />}
          <P trend={trend}>{trendChange}</P>
        </IconStyle>

        <p> Last 30 days</p>
      </BoxNumber>
    </Box>
  );
}

export default StatisticCard;

import styled from "styled-components";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 0.85rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

function StatisticCard({ text, icon, iconColor, data }) {
  return (
    <Box>
      <div>
        <h2> {data && data}</h2>
        <p> {text && text}</p>
      </div>
      <BoxIcon $iconColor={iconColor}>{icon && icon}</BoxIcon>
    </Box>
  );
}

export default StatisticCard;

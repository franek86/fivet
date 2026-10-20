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
  background-color: var(--color-grey-200);
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

const Description = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--color-text-muted);
`;

function StatisticCard({ text, icon, data, description }) {
  return (
    <Box>
      <BoxContent>
        <BoxIcon>{icon && icon}</BoxIcon>
        {description && <Description>{description}</Description>}
      </BoxContent>
      <BoxNumber>
        <div>
          <p className='label'> {text}</p>
          <div className='value'> {data}</div>
        </div>
      </BoxNumber>
    </Box>
  );
}

export default StatisticCard;

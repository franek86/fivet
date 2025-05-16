import styled from "styled-components";

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const P = styled.p`
  font-size: 2rem;
  color: var(--color-grey-500);
`;

function EmptyState({ message = "No data available", icon = null }) {
  return (
    <StyledWrap>
      {icon && <div>{icon}</div>}
      <P className='text-lg'>{message}</P>
    </StyledWrap>
  );
}

export default EmptyState;

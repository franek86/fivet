import styled from "styled-components";

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
`;

const P = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 1rem 0;
`;

const Icon = styled.div`
  background-color: var(--color-white);
  width: 40px;
  height: 40px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md);
`;

function EmptyState({ message = "No data available", icon = null, children }) {
  return (
    <StyledWrap>
      {icon && <Icon>{icon}</Icon>}
      <P className='text-lg'>{message}</P>
      {children}
    </StyledWrap>
  );
}

export default EmptyState;

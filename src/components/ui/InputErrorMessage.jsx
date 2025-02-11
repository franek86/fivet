import styled from "styled-components";

const P = styled.p`
  font-size: 1.2rem;
  padding: 0.25rem 0.75rem;
  color: var(--color-red-100);
  background-color: var(--color-red-700);
  border-radius: var(--border-radius-sm);
`;

function InputErrorMessage({ message }) {
  if (!message) return null;
  return <P>{message}</P>;
}

export default InputErrorMessage;

import styled from "styled-components";

const P = styled.p`
  font-size: 1.2rem;
  padding: 0.25rem 0;
  color: var(--color-red-700);
  margin-top: 0.5rem;
`;

function InputErrorMessage({ message }) {
  if (!message) return null;
  return <P>{message}</P>;
}

export default InputErrorMessage;

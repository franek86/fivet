import { CircleAlert } from "lucide-react";
import styled from "styled-components";

const DIV = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 1.2rem;
  padding: 0.25rem 0;
  color: var(--color-red-700);
  margin-top: 0.5rem;
  text-align: left;
`;

function InputErrorMessage({ message }) {
  if (!message) return null;
  return (
    <DIV>
      <CircleAlert size={14} />
      {message}
    </DIV>
  );
}

export default InputErrorMessage;

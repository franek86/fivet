import styled from "styled-components";

const StyleLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.4rem;
`;

function Label({ children }) {
  return <StyleLabel>{children}</StyleLabel>;
}

export default Label;

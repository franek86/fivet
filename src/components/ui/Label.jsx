import styled from "styled-components";

const StyleLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-right: 1rem;
  margin-bottom: 0.4rem;
  text-align: left;
`;

function Label({ children, htmlFor }) {
  return <StyleLabel htmlFor={htmlFor}>{children}</StyleLabel>;
}

export default Label;

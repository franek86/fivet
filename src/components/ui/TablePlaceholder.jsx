import styled from "styled-components";
import Table from "./Table.jsx";

const BoxPlaceholder = styled.div`
  background: var(--linear-gradient);
  background-size: 200% 100%;
  min-width: 100%;
  width: 100px;
  height: 20px;
`;

function TablePlaceholder() {
  return (
    <Table columns='1fr'>
      <Table.Row>
        <BoxPlaceholder />
      </Table.Row>
    </Table>
  );
}

export default TablePlaceholder;

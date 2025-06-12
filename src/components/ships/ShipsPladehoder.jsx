import styled from "styled-components";
import Table from "../ui/Table.jsx";

function ShipsPlaceholder() {
  return (
    <Table.Row>
      <Table.Column>
        <BoxPlaceholder />
      </Table.Column>

      <Table.Column>
        <BoxPlaceholder />
      </Table.Column>

      <Table.Column>
        <BoxPlaceholder />
      </Table.Column>
      <Table.Column>
        <BoxPlaceholder />
      </Table.Column>

      <Table.Column>
        <BoxPlaceholder />
      </Table.Column>
      <Table.Column>
        <BoxPlaceholder />
      </Table.Column>
    </Table.Row>
  );
}

export default ShipsPlaceholder;

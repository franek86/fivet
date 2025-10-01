import styled from "styled-components";

const StyledTable = styled.table`
  font-size: 1.3rem;
  margin-top: 2.4rem;
  width: 100%;
  margin-bottom: 3rem;
`;

const TableHeader = styled.th`
  background-color: var(--color-grey-50);
  letter-spacing: 0.4px;
  font-weight: 400;
  color: var(--color-grey-500);
  padding: 1.35rem 0.5rem;
`;

const TableBody = styled.tbody`
  td {
    text-align: center;
    letter-spacing: 0.4px;
    color: var(--color-grey-700);
    padding: 1.35rem 0.5rem;
  }
`;

function CustomTable({ columns, data, renderRow }) {
  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader key={column.accessor} className={column.style}>
                {column.header}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <TableBody>{data.map((item) => renderRow(item))}</TableBody>
      </StyledTable>
    </>
  );
}

export default CustomTable;

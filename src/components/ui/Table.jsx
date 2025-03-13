import { createContext, useContext } from "react";
import styled from "styled-components";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const StyledTable = styled.div`
  font-size: 1.4rem;
  margin-top: 2.4rem;

  @media (min-width: 640px) {
    border: 1px solid var(--color-grey-200);
  }
`;

const StyledReuseRow = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "columns",
})`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  column-gap: 2.4rem;
`;

const TableHeader = styled(StyledReuseRow)`
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const TableRow = styled(StyledReuseRow)`
  padding: 1.2rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const TableBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer``;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const isMdScreen = useMediaQuery(640); // min width 640px
  if (!isMdScreen) return null;
  const { columns } = useContext(TableContext);
  return (
    <TableHeader role='row' columns={columns} as='header'>
      {children}
    </TableHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <TableRow role='row' columns={columns}>
      {children}
    </TableRow>
  );
}

function Body({ children }) {
  return <TableBody>{children}</TableBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Column = Column;
Table.Body = Body;
Table.Footer = Footer;

export default Table;

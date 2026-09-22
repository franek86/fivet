import styled from "styled-components";
import Checkbox from "../../ui/Checkbox.jsx";
import ShipRow from "./ShipRow.jsx";

const ShipList = ({ ships = [], selected = [], user, onSelectAll, onSelect }) => {
  const allSelected = ships.length > 0 && selected.length === ships.length;

  return (
    <ListWrapper>
      <ListHeader>
        <Checkbox checked={allSelected} onChange={onSelectAll} />

        <HeaderCell />
        {user?.role === "ADMIN" && <HeaderCell>Publish status</HeaderCell>}
        <HeaderCell>IMO</HeaderCell>
        <HeaderCell>Type</HeaderCell>
        <HeaderCell>Price</HeaderCell>

        <HeaderCell>Status</HeaderCell>

        <HeaderCell>Actions</HeaderCell>
      </ListHeader>

      <ListBody>
        {ships.map((ship) => (
          <ShipRow key={ship.id} ship={ship} selected={selected.includes(ship.id)} user={user} onSelect={onSelect} />
        ))}
      </ListBody>
    </ListWrapper>
  );
};

export default ShipList;

const ListWrapper = styled.div`
  width: 100%;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background: var(--color-white);
`;

const HeaderCell = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
`;

const ListHeader = styled.div`
  display: grid;

  grid-template-columns:
    4rem
    minmax(24rem, 2fr)
    12rem
    12rem
    14rem
    16rem
    12rem
    5rem;

  align-items: center;

  min-height: 5rem;
  padding: 0 1.5rem;

  border-bottom: 1px solid var(--color-grey-200);
  background: var(--color-border);

  @media (max-width: 1100px) {
    grid-template-columns:
      4rem
      minmax(22rem, 2fr)
      11rem
      11rem
      13rem
      15rem
      11rem
      5rem;
  }

  @media (max-width: 850px) {
    grid-template-columns:
      4rem
      minmax(20rem, 2fr)
      11rem
      11rem
      13rem
      15rem
      5rem;

    ${HeaderCell}:nth-of-type(3) {
      display: none;
    }
  }
`;

const ListBody = styled.div`
  width: 100%;
`;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Ship, SlidersHorizontal, Trash2 } from "lucide-react";
import styled from "styled-components";

import Pagination from "../Pagination.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import EmptyState from "../EmptyState.jsx";

import Sort from "../ui/Sort.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import ShipFilters from "./ShipFilters.jsx";
import AppShip from "./AddShip.jsx";
import ShipList from "./ship-table/ShipList.jsx";

import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useShips } from "../../hooks/ships/useShips.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { useAllShipType } from "../../hooks/useShipType.js";
import { useUser } from "../../hooks/useAuth.js";
import { DEFAULT_FILTERS } from "../../constants/index.js";
import ShipToolbar from "./ship-table/ShipToolbar.jsx";
import ShipSelectedFilters from "./ship-table/ShipSelectedFilters.jsx";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2.8rem;
  gap: 3rem;
`;

const ShipFilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  div {
    display: flex;
    font-size: 1.5rem;
  }

  &:hover {
    opacity: 0.6;
  }
`;

const FilterState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

function ShipsTable() {
  //Dispatch and actions
  const dispatch = useDispatch();

  //Get user
  const { data: user } = useUser();

  //Filter state
  const [filterState, setFilterState] = useState(DEFAULT_FILTERS);

  //fetch ships type
  const { allShipType: shipTypes } = useAllShipType();

  //Fetch ships data using custom hook
  const { ships = [], count = 0, isLoading, isFetching } = useShips(filterState);

  // Custom hook for selection and deletion
  const { mutate: deleteShip } = useDeleteShip();
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(ships, deleteShip);

  /* current filters  */
  const hasFilters =
    Boolean(filterState.search) ||
    filterState.shipType.length > 0 ||
    filterState.minPrice !== undefined ||
    filterState.maxPrice !== undefined;

  /* Reset filter to default */
  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  /* Open filter */
  const handleOpenFilters = () => {
    dispatch(openModalByName("ship-filter"));
  };

  // Loading, error, and empty states
  if (isLoading) {
    return <TablePlaceholder count={filterState.limit} />;
  }

  if (ships?.length === 0) {
    if (!hasFilters) {
      return (
        <EmptyState message='No vessels yet' icon={<Ship />}>
          <p>
            There are no vessels to display right now. <br /> Create a vessel to get started.
          </p>
          <AppShip />
        </EmptyState>
      );
    }

    return (
      <FilterState>
        <h2>No ships match your filters</h2>
        <p>Please clear filters or adjust your search.</p>
        <Button onClick={() => resetFilters()}>Clear filters</Button>
      </FilterState>
    );
  }

  return (
    <>
      <Modal name='ship-filter' onClose={() => dispatch(closeModalByName("ship-filter"))}>
        <ShipFilters shipTypes={shipTypes} filterState={filterState} setFilterState={setFilterState} />
      </Modal>

      <ShipToolbar
        filterState={filterState}
        setFilterState={setFilterState}
        selectedCount={selected.length}
        onOpenFilters={handleOpenFilters}
        onDeleteSelected={handleDeleteSelected}
      />

      <ShipSelectedFilters filters={filterState} />

      {isFetching ? (
        <TablePlaceholder count={ships.length} />
      ) : (
        <ShipList ships={ships} selected={selected} user={user} onSelectAll={handleSelectAll} onSelect={handleCheckboxChange} />
      )}

      <Pagination count={count} />
    </>
  );
}

export default ShipsTable;

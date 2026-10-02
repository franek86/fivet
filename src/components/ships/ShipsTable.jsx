import { useState } from "react";
import styled from "styled-components";
import { Ship } from "lucide-react";

import Pagination from "../Pagination.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import EmptyState from "../EmptyState.jsx";
import ShipToolbar from "./ship-table/ShipToolbar.jsx";
import ShipSelectedFilters from "./ship-table/ShipSelectedFilters.jsx";
import ShipFilters from "./ShipFilters.jsx";
import AppShip from "./AddShip.jsx";
import ShipList from "./ship-table/ShipList.jsx";

import { useShips } from "../../hooks/ships/useShips.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { useAllShipType } from "../../hooks/useShipType.js";
import { useUser } from "../../hooks/useAuth.js";

import { DEFAULT_FILTERS } from "../../constants/index.js";
import { useDispatch, useSelector } from "react-redux";
import EmtpyFilterState from "../ui/EmtpyFilterState.jsx";
import { setClearSearch } from "../../slices/searchSlice.js";

function ShipsTable() {
  //Gloabal state search vessels
  const dispatch = useDispatch();
  const searchVessels = useSelector((state) => state.search.vessels);

  //Get user
  const { data: user } = useUser();

  //Open filter state
  const [openFilter, setOpenFilter] = useState(false);
  //Filter state
  const [filterState, setFilterState] = useState(DEFAULT_FILTERS);

  //fetch ships type
  const { allShipType: shipTypes } = useAllShipType();

  //Fetch ships data using custom hook
  const { ships = [], count = 0, isLoading } = useShips({ ...filterState, search: searchVessels });

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
    dispatch(setClearSearch("vessels"));
  };

  /* Open filter */
  const handleOpenFilters = () => {
    setOpenFilter(!openFilter);
  };

  // Loading, error, and empty states
  if (isLoading) {
    return <TablePlaceholder count={filterState.limit} />;
  }

  if (!isLoading && ships?.length === 0) {
    if (!hasFilters) {
      return <EmtpyFilterState title='No vessels match in your filters' onHandleReset={resetFilters} />;
    }

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
    <>
      <ShipSelectedFilters filters={filterState} />
      <ShipToolbar
        filterState={filterState}
        setFilterState={setFilterState}
        selectedCount={selected.length}
        onOpenFilters={handleOpenFilters}
        onDeleteSelected={handleDeleteSelected}
      />
      <Pagination
        count={count}
        page={filterState.page}
        limit={filterState.limit}
        onPageChange={(page) =>
          setFilterState((prev) => ({
            ...prev,
            page,
          }))
        }
      />
      <Container $toggleFilter={openFilter}>
        <ShipFilters shipTypes={shipTypes} filterState={filterState} setFilterState={setFilterState} toggleFilter={openFilter} />

        <ShipList ships={ships} selected={selected} user={user} onSelectAll={handleSelectAll} onSelect={handleCheckboxChange} />
      </Container>
    </>
  );
}

export default ShipsTable;

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ $toggleFilter }) => ($toggleFilter ? "30rem 1fr" : "0 1fr")};
  gap: ${({ $toggleFilter }) => ($toggleFilter ? "2rem" : "0")};
`;

const FilterState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;

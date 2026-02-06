import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import ShipsColumn from "./ShipsColumn.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import EmptyState from "../EmptyState.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import Sort from "../ui/Sort.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import ShipFilters from "./ShipFIlters.jsx";

import styled from "styled-components";

import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useShips } from "../../hooks/ships/useShips.js";
import { setSearchTerm } from "../../slices/searchSlice.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { SlidersHorizontal, Trash2 } from "lucide-react";
import { useAllShipType } from "../../hooks/useShipType.js";
import { urlFormatDate } from "../../utils/formatDate.js";

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
  const role = useSelector((state) => state.auth.role);
  const searchTerm = useSelector((state) => state.search.term);

  // React Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  //Read query params from URL
  const page = Number(searchParams.get("page") ?? 1);
  const sortBy = searchParams.get("sortBy") ?? "createdAt-desc";

  //fetch ship types
  const { allShipType: shipTypes } = useAllShipType();

  //Fetch ships data using custom hook
  const { ships, count, isLoading, isFetching } = useShips({
    page,
    sortBy,
    filters: {
      isPublished: searchParams.get("isPublished"),
      price: searchParams.get("price"),
      search: searchTerm?.trim() || undefined,
      shipType: searchParams.get("shipType"),
      dateFrom: searchParams.get("dateFrom"),
      dateTo: searchParams.get("dateTo"),
    },
  });

  // Custom hook for selection and deletion
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(ships, useDeleteShip().mutate);

  // Sorting options
  const sortItems = [
    { value: "shipName-asc", name: "Ship name (A-Z)" },
    { value: "shipName-desc", name: "Ship name (Z-A)" },
    { value: "price-asc", name: "Cheapest" },
    { value: "price-desc", name: "Expensive" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  // Table columns configuration
  const tableColumns = [
    {
      header: (
        <Checkbox checked={selected?.length > 0 && selected?.length === ships?.length} onChange={(checked) => handleSelectAll(checked)} />
      ),
      accessor: "delete row",
      style: "hidden-table-sm",
    },
    { header: "Image", accessor: "image", style: "hidden-table-sm" },
    ...(role === "ADMIN" ? [{ header: "Published", accessor: "published", style: "hidden-table-sm" }] : []),
    { header: `${role !== "ADMIN" ? "Ship type" : "User"}`, accessor: "ship-type-user" },
    { header: "Ship Name", accessor: "ship name" },
    { header: "IMO no.", accessor: "imo" },
    { header: "Price", accessor: "price" },
    { header: "Actions", accessor: "actions" },
  ];

  // Function to update URL query parameters
  const updatedQueryParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => ((value ?? "") ? newParams.set(key, value) : newParams.delete(key)));
    setSearchParams(newParams);
  };

  // Apply filter values to URL and trigger data reload
  const handleApplyFilters = ({ isPublished, priceRange, shipType, dateFrom, dateTo }) => {
    updatedQueryParams({
      isPublished: isPublished ? "true" : null,
      price: priceRange ? priceRange : null,
      shipType: shipType ? shipType : null,
      dateFrom: dateFrom ? urlFormatDate(dateFrom) : null,
      dateTo: dateTo ? urlFormatDate(dateTo) : null,
    });
    /* dispatch(closeModalByName("ship-filter")); */
  };

  // Reset filters and search term, update URL
  const handleResetFilter = () => {
    dispatch(setSearchTerm(""));
    updatedQueryParams({
      isPublished: null,
      price: null,
      search: null,
      shipType: null,
      dateFrom: null,
      dateTo: null,
    });
    dispatch(closeModalByName("ship-filter"));
  };

  // Render single row
  const renderRow = (item) => <ShipsColumn key={item.id} ship={item} selectedShip={selected} onCheckboxChange={handleCheckboxChange} />;

  // check if filter exists in url params
  const hasFilters = [...searchParams.keys()].length > 0;

  // Loading, error, and empty states
  if (isLoading) return <Spinner />;
  if (!isLoading && ships.length === 0) {
    if (!hasFilters) {
      return <EmptyState message='No ships for now. Please create ship' />;
    }

    return (
      <FilterState>
        <h2>No ships match your filters</h2>
        <p>Please clear filters or adjust your search.</p>
        <Button onClick={() => setSearchParams({})}>Clear filters</Button>
      </FilterState>
    );
  }

  return (
    <>
      <Modal name='ship-filter' onClose={() => dispatch(closeModalByName("ship-filter"))}>
        <ShipFilters data={ships} shipTypes={shipTypes} onApply={handleApplyFilters} onReset={handleResetFilter} />
      </Modal>
      <FlexWrapper>
        <ShipFilterWrap onClick={() => dispatch(openModalByName("ship-filter"))}>
          <SlidersHorizontal size={25} />
          <div>Filters</div>
        </ShipFilterWrap>
        <Sort items={sortItems} label='Sort by:' />
        {selected.length > 0 && (
          <div>
            <Button $variation='danger' onClick={handleDeleteSelected}>
              <Trash2 size={14} />
              <div>
                Delete {selected.length} item
                {selected.length > 1 ? "s" : ""}
              </div>
            </Button>
          </div>
        )}
      </FlexWrapper>
      <div>
        {isFetching ? <TablePlaceholder count={ships.length} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={ships} />}
      </div>
      <Pagination count={count} />
    </>
  );
}

export default ShipsTable;

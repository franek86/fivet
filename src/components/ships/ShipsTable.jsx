import { useSelector } from "react-redux";
import { useShips } from "../../hooks/ships/useShips.js";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import ShipsColumn from "./ShipsColumn.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import EmptyState from "../EmptyState.jsx";

import styled from "styled-components";
import Sort from "../ui/Sort.jsx";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
`;

const ShipFilters = styled.div``;

function ShipsTable() {
  const { ships, count, isLoading, error, isFetching } = useShips();
  const role = useSelector((state) => state.auth.role);

  const sortItems = [
    { value: "shipName-asc", name: "Ship name (A-Z)" },
    { value: "shipName-desc", name: "Ship name (Z-A)" },
    { value: "price-asc", name: "Cheapest" },
    { value: "price-desc", name: "Expensive" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  const tableColumns = [
    { header: "", accessor: "delete row" },
    { header: "Image", accessor: "image" },
    ...(role === "ADMIN" ? [{ header: "Published", accessor: "published" }] : []),
    { header: `${role !== "ADMIN" ? "Ship type" : "User"}`, accessor: "ship-type-user" },
    { header: "Ship Name", accessor: "ship name" },
    { header: "IMO no.", accessor: "imo" },
    { header: "Price", accessor: "price" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <Spinner />;

  if (error) return <div>Error</div>;

  const renderRow = (item) => <ShipsColumn key={item.id} ship={item} />;
  const dataLength = ships?.length;

  if (dataLength < 1) return <EmptyState message='No ships for now. Please create ship' />;
  return (
    <>
      <FlexWrapper>
        <ShipFilters>Filter</ShipFilters>
        <Sort items={sortItems} label='Sort by:' />
      </FlexWrapper>
      {isFetching ? <TablePlaceholder count={dataLength} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={ships} />}
      <Pagination count={count} />
    </>
  );
}

export default ShipsTable;

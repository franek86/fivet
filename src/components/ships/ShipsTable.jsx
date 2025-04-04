import { useSelector } from "react-redux";
import { useShips } from "../../hooks/ships/useShips.js";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import ShipsColumn from "./ShipsColumn.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CustomTable from "../ui/CustomTable.jsx";

function ShipsTable() {
  const { ships, count, isLoading, error, isFetching } = useShips();
  const role = useSelector((state) => state.auth.role);

  const tableColumns = [
    { header: "", accessor: "delete row" },
    { header: "Image", accessor: "image" },
    { header: `${role !== "admin" ? "Ship type" : "User"}`, accessor: "ship-type-user" },
    { header: "Ship Name", accessor: "ship name" },
    { header: "IMO no.", accessor: "imo" },
    { header: "Price", accessor: "price" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <Spinner />;

  if (error) return <div>Error</div>;

  if (!ships || ships.length === 0) return <div>No ships</div>;

  const renderRow = (item) => <ShipsColumn key={item.id} ship={item} />;
  const dataLength = ships?.length;
  return (
    <>
      {isFetching ? <TablePlaceholder count={dataLength} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={ships} />}
      <Pagination count={count} />
    </>
    /*  <Table columns='80px 80px 1fr 1fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Image</div>
        {role !== "admin" ? <div>Ship Type</div> : <div>User</div>}

        <div>Ship Name</div>
        <div>IMO no.</div>
        <div>Price</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body>
        {isFetching
          ? ships.map((_, index) => <TablePlaceholder key={index} />)
          : ships.map((ship, index) => <ShipsColumn ship={ship} key={ship.id} index={index} />)}
      </Table.Body>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table> */
  );
}

export default ShipsTable;

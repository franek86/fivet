import { useSelector } from "react-redux";
import { useShips } from "../../hooks/ships/useShips.js";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import Table from "../ui/Table.jsx";
import ShipsColumn from "./ShipsColumn.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

function ShipsTable() {
  const { ships, count, isLoading, error, isFetching } = useShips();
  const role = useSelector((state) => state.auth.role);

  if (isLoading) return <Spinner />;

  if (error) return <div>Error</div>;

  if (!ships || ships.length === 0) return <div>No ships</div>;
  return (
    <Table columns='80px 1fr 1fr 1fr 1fr 1fr'>
      <Table.Header>
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
    </Table>
  );
}

export default ShipsTable;

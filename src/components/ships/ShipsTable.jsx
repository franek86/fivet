import { useShips } from "../../hooks/ships/useShips.js";
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";

import Table from "../ui/Table.jsx";
import ShipsColumn from "./ShipsColumn.jsx";

function ShipsTable() {
  const { ships, count, isLoading, error } = useShips();

  if (isLoading) return <Spinner />;

  if (error) return <div>Error</div>;

  return (
    <Table columns='40px 80px 1fr 1fr 1fr 1fr 100px'>
      <Table.Header>
        <div>No.</div>
        <div>Image</div>
        <div>Ship Name</div>
        <div>IMO no.</div>
        <div>Ship Type</div>
        <div>Price</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body>
        {ships.map((ship, index) => (
          <ShipsColumn ship={ship} key={ship.id} index={index} />
        ))}
      </Table.Body>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default ShipsTable;

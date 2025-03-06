import { useSelector } from "react-redux";
import { useShips } from "../../hooks/ships/useShips.js";
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";

import Table from "../ui/Table.jsx";
import ShipsColumn from "./ShipsColumn.jsx";

function ShipsTable() {
  const { ships, count, isLoading, error } = useShips();
  const role = useSelector((state) => state.auth.role);

  if (isLoading) return <Spinner />;

  if (error) return <div>Error</div>;

  if (!ships || ships.length === 0) return <div>No ships</div>;
  return (
    <Table columns='40px 80px 1fr 1fr 1fr 1fr 1fr'>
      <Table.Header>
        <div>No.</div>
        <div>Image</div>
        {role !== "admin" ? <div>Ship Type</div> : <div>User</div>}

        <div>Ship Name</div>
        <div>IMO no.</div>
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

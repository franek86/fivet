import { Link } from "react-router";
import Button from "../ui/Button.jsx";

function AddShip() {
  return (
    <>
      <Link to='/vessels/create'>
        <Button>Add vessel</Button>
      </Link>
    </>
  );
}

export default AddShip;

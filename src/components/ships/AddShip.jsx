import { Link } from "react-router";
import Button from "../ui/Button.jsx";

function AddShip() {
  return (
    <>
      <Link to='/ships/create'>
        <Button>Add new ship</Button>
      </Link>
    </>
  );
}

export default AddShip;

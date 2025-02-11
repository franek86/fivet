import { LuPencil, LuTrash2 } from "react-icons/lu";
import { formatedPrice } from "../../utils/formattedPrice.js";
import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Table from "../ui/Table.jsx";

function ShipsColumn({ ship }) {
  const { id, mainImage, shipName, imoNumber, shipType, price } = ship;
  return (
    <Table.Row>
      <Table.Column>{id}</Table.Column>
      <Table.Column>
        <picture>
          <img src={mainImage} alt={shipName} />
        </picture>
      </Table.Column>
      <Table.Column>{shipName}</Table.Column>
      <Table.Column>{imoNumber}</Table.Column>
      <Table.Column>{shipType}</Table.Column>
      <Table.Column>
        <strong>{formatedPrice(price)}</strong>
      </Table.Column>
      <Table.Column>
        <Dropdown>
          <Button variation='icon'>
            <LuPencil />
            Edit
          </Button>
          <Button variation='icon' onClick={() => dispatch(openModalByName(categoryId))}>
            <LuTrash2 />
            Delete
          </Button>
        </Dropdown>
      </Table.Column>
    </Table.Row>
  );
}

export default ShipsColumn;

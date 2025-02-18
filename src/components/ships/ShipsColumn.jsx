import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Table from "../ui/Table.jsx";

import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Link, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

import { PAGE_SIZE } from "../../utils/constants.js";
import { formatedPrice } from "../../utils/formattedPrice.js";
import ConfirmDialog from "../ConfirmDialog.jsx";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

function ShipsColumn({ ship, index }) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { mutate } = useDeleteShip();

  const { id: shipId, mainImage, shipName, imoNumber, shipType, price } = ship;

  const currentPage = searchParams.get("page") || 1;
  const orderNumberItems = (currentPage - 1) * PAGE_SIZE + (index + 1);

  return (
    <Table.Row>
      <Table.Column>{orderNumberItems}</Table.Column>
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
          <Button $variation='icon'>
            <Link to={`edit/${shipId}`}>
              <LuPencil />
              Edit
            </Link>
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(shipId))}>
            <LuTrash2 />
            Delete
          </Button>
        </Dropdown>
      </Table.Column>

      <Modal name={shipId} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={shipName} onConfirm={() => mutate(shipId)} onCloseModal={() => dispatch(closeModalByName())} />
      </Modal>
    </Table.Row>
  );
}

export default ShipsColumn;

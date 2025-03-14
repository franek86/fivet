import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Table from "../ui/Table.jsx";

import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

import { formatedPrice } from "../../utils/formattedPrice.js";
import ConfirmDialog from "../ConfirmDialog.jsx";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

function ShipsColumn({ ship }) {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const { mutate } = useDeleteShip();
  const { id: shipId, mainImage, shipName, imoNumber, price, shipType } = ship;

  const fullName = ship.profile?.fullName || "";

  return (
    <Table.Row>
      <Table.Column>
        <picture>
          <img src={mainImage && !mainImage.error ? mainImage : "/images/no-image.webp"} alt={shipName} />
        </picture>
      </Table.Column>

      <Table.Column>{role !== "admin" ? shipType : `${fullName}`}</Table.Column>

      <Table.Column>{shipName}</Table.Column>
      <Table.Column>{imoNumber}</Table.Column>

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

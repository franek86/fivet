import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

import { LuPencil, LuTrash2 } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

import { formatedPrice } from "../../utils/formattedPrice.js";

const StyledImage = styled.img`
  width: 80px;
`;

function ShipsColumn({ ship }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const { mutate } = useDeleteShip();
  const { id: shipId, mainImage, shipName, imoNumber, price, shipType } = ship;

  const fullName = ship.profile?.fullName || "";

  const handleSelectedItem = (id) => {
    setSelectedItem((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  return (
    <tr>
      <td>
        <Checkbox checked={selectedItem.includes(shipId)} onChange={() => handleSelectedItem(shipId)} />
      </td>
      <td>
        <StyledImage src={mainImage && !mainImage.error ? mainImage : "/images/no-image.webp"} alt={shipName} />
      </td>

      <td>{role !== "admin" ? shipType : `${fullName}`}</td>

      <td>{shipName}</td>
      <td>{imoNumber}</td>

      <td>
        <strong>{formatedPrice(price)}</strong>
      </td>
      <td>
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
      </td>

      <Modal name={shipId} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={shipName} onConfirm={() => mutate(shipId)} onCloseModal={() => dispatch(closeModalByName())} />
      </Modal>
    </tr>
  );
}

export default ShipsColumn;

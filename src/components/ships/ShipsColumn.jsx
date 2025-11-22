import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";

import { LuPencil, LuTrash2, LuEye } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

import { formatedPrice } from "../../utils/formattedPrice.js";
import { usePublishShip } from "../../hooks/ships/usePublishShip.js";
import socket from "../../shared/socket.js";

const StyledImage = styled.img`
  width: 80px;
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function ShipsColumn({ ship, selectedShip, onCheckboxChange }) {
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const { mutate } = useDeleteShip();
  const { mutate: mutatePublishShip } = usePublishShip();

  const {
    id: shipId,
    mainImage,
    isPublished,
    shipName,
    imo,
    price,
    shipType: { name: shipTypeName },
    userId,
    user: {
      profile: { fullName },
    },
  } = ship;

  const [isPublish, setIsPublish] = useState(isPublished);

  const handleToggle = (id, userId) => {
    mutatePublishShip(
      { id, isPublished: !isPublish, userId },
      {
        onSuccess: () => {
          setIsPublish((prev) => !prev);
        },
      }
    );
  };

  return (
    <tr>
      <td className='table-td'>
        <Checkbox checked={selectedShip.includes(shipId)} onChange={() => onCheckboxChange(shipId)} />
      </td>
      <td className='table-td'>
        <StyledImage src={mainImage && !mainImage.error ? mainImage : "/images/no-image.webp"} alt={shipName} />
      </td>
      {role !== "ADMIN" ? null : (
        <td className='table-td'>
          <ToggleSwitch checked={isPublish} onChange={() => handleToggle(shipId, userId)} />
        </td>
      )}

      <td>{role !== "ADMIN" ? shipTypeName : `${fullName}`}</td>

      <td>{shipName}</td>
      <td>{imo}</td>

      <td>
        <strong>{formatedPrice(price)}</strong>
      </td>
      <td>
        <Dropdown>
          <Button $variation='icon'>
            <Link to={`${shipId}`}>
              <ButtonInner>
                <LuEye />
                View
              </ButtonInner>
            </Link>
          </Button>
          <Button $variation='icon'>
            <Link to={`edit/${shipId}`}>
              <ButtonInner>
                <LuPencil />
                Edit
              </ButtonInner>
            </Link>
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(shipId))}>
            <ButtonInner>
              <LuTrash2 />
              Delete
            </ButtonInner>
          </Button>
        </Dropdown>
      </td>

      <Modal name={shipId} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={shipName} onConfirm={() => mutate(shipId)} onCloseModal={() => dispatch(closeModalByName(shipId))} />
      </Modal>
    </tr>
  );
}

export default ShipsColumn;

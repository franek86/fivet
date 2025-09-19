import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

import { LuPencil, LuTrash2, LuEye } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

import { formatedPrice } from "../../utils/formattedPrice.js";
import { usePublishShip } from "../../hooks/ships/usePublishShip.js";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";

const StyledImage = styled.img`
  width: 80px;
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function ShipsColumn({ ship }) {
  const [selectedItem, setSelectedItem] = useState([]);
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
    user: {
      profile: { fullName },
    },
  } = ship;

  const [isPublish, setIsPublish] = useState(isPublished);
  const handleSelectedItem = (id) => {
    setSelectedItem((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const handleToggle = (id) => {
    mutatePublishShip(
      { id, isPublished: !isPublish },
      {
        onSuccess: () => {
          setIsPublish((prev) => !prev);
        },
      }
    );
  };

  return (
    <tr>
      <td>
        <Checkbox checked={selectedItem.includes(shipId)} onChange={() => handleSelectedItem(shipId)} />
      </td>
      <td>
        <StyledImage src={mainImage && !mainImage.error ? mainImage : "/images/no-image.webp"} alt={shipName} />
      </td>
      {role !== "ADMIN" ? null : (
        <td>
          <ToggleSwitch checked={isPublish} onChange={() => handleToggle(shipId)} />
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
          <Button $variation='icon' $size='small'>
            <ButtonInner>
              <LuTrash2 />
              Delete
            </ButtonInner>
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

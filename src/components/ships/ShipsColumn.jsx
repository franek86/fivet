import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

import { LuChevronDown, LuPencil, LuTrash2 } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

import { formatedPrice } from "../../utils/formattedPrice.js";
import { usePublishShip } from "../../hooks/ships/usePublishShip.js";

const StyledImage = styled.img`
  width: 80px;
`;

const PublishButton = styled.div`
  color: white;
  padding: 0.35rem;
  border-radius: var(--border-radius-md);
  width: 80%;
  margin-top: 0.8rem;
`;

const StyledPublish = styled.div`
  display: flex;
  align-items: center;
`;

const PublishButtonGreen = styled(PublishButton)`
  background-color: var(--color-green-700);
  cursor: pointer;
`;

const PublishButtonRed = styled(PublishButton)`
  background-color: var(--color-red-700);
  cursor: pointer;
`;

function ShipsColumn({ ship }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const { mutate } = useDeleteShip();
  const { mutate: mutatePublishShip, isPending } = usePublishShip();

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
          <StyledPublish onClick={() => setVisibleDropdown(!visibleDropdown)}>
            {isPublish ? <PublishButtonGreen>Live</PublishButtonGreen> : <PublishButtonRed>Unpublish</PublishButtonRed>} <LuChevronDown />
          </StyledPublish>
          {visibleDropdown && (
            <div onClick={() => handleToggle(shipId)} disabled={isPending}>
              {isPending ? (
                "Updating..."
              ) : isPublish ? (
                <PublishButtonRed>Unpublish</PublishButtonRed>
              ) : (
                <PublishButtonGreen>Publish</PublishButtonGreen>
              )}
            </div>
          )}
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

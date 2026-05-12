import { useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";

import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useDeleteShip } from "../../hooks/ships/useDeleteShip.js";

import { formatedPrice } from "../../utils/formattedPrice.js";
import { usePublishShip } from "../../hooks/ships/usePublishShip.js";
import { Eye, Pencil, Ship, Trash2 } from "lucide-react";
import { useUser } from "../../hooks/useAuth.js";

const StyledImage = styled.img`
  width: 80px;
  border-radius: var(--border-radius-lg);
`;

const NoImage = styled.div`
  display: grid;
  place-items: center;
  width: 85px;
  height: 45px;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-accent);
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const P = styled.div`
  text-align: start;
  width: max-content;
`;

const PublishedStatus = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: ${({ $props }) => ($props ? "var(--color-success)" : "var(--color-danger)")};
`;

const TdCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

function ShipsColumn({ ship, selectedShip, onCheckboxChange }) {
  const { data: user } = useUser();

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
      },
    );
  };

  return (
    <tr>
      <td className='table-td'>
        <Checkbox checked={selectedShip.includes(shipId)} onChange={() => onCheckboxChange(shipId)} />
      </td>
      <td className='table-td'>
        {mainImage && !mainImage.error ? (
          <StyledImage src={mainImage} alt={shipName} />
        ) : (
          <NoImage>
            <Ship />
          </NoImage>
        )}
      </td>

      {user?.role !== "ADMIN" ? null : (
        <td className='table-td'>
          <ToggleSwitch checked={isPublish} onChange={() => handleToggle(shipId, userId)} />
        </td>
      )}

      {user?.role !== "USER" ? null : (
        <td className='table-td'>
          <TdCenter>
            <PublishedStatus $props={isPublished} />
            {isPublished ? "Live" : "Draft"}
          </TdCenter>
        </td>
      )}

      <td>{user?.role !== "ADMIN" ? shipTypeName : `${fullName}`}</td>

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
                <Eye size={16} />
                <P>View</P>
              </ButtonInner>
            </Link>
          </Button>
          <Button $variation='icon'>
            <Link to={`edit/${shipId}`}>
              <ButtonInner>
                <Pencil size={16} />
                <P>Edit</P>
              </ButtonInner>
            </Link>
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(shipId))}>
            <ButtonInner>
              <Trash2 size={16} />
              <P>Delete</P>
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

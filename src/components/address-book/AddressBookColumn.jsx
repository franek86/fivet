import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../ui/Button.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import FormAddressBook from "./FormAddressBook.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";

import { LuChevronDown, LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import { useDeleteAddressBook, useEditAddressBookPriority } from "../../hooks/useAddressBook.js";
import styled from "styled-components";
import SingleAddressBook from "./SingleAddressBook.jsx";

const StyledPriority = styled.div`
  max-width: max-content;
  margin: auto;
  background-color: ${({ $props }) => ($props === "REGULAR" ? "#c7d2fe" : "#99f6e4")};
  padding: 0.5rem 0.85rem;
  font-size: 1.2rem;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  position: relative;
`;

const StyledDropdown = styled.form`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: var(--color-grey-200);
  text-align: center;
`;

function AddressBookColumn({ addressBook }) {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const { id, fullName, email, mobile_number, priority } = addressBook;
  const [changePriority, setChangePriority] = useState(priority);

  const isMdScreen = useMediaQuery(640); //min width 640px
  const dispatch = useDispatch();

  const { mutate } = useDeleteAddressBook();
  const { mutate: editPriority } = useEditAddressBookPriority();

  const editButton = (
    <Button $variation='icon' onClick={() => dispatch(openModalByName(`edit-${id}`))}>
      <LuPencil />
      Edit
    </Button>
  );

  const deleteButton = (
    <Button $variation='icon' onClick={() => dispatch(openModalByName(id))}>
      <LuTrash2 />
      Delete
    </Button>
  );

  const viewButton = (
    <Button $variation='icon' onClick={() => dispatch(openModalByName(`view-${id}`))}>
      <LuEye />
      View
    </Button>
  );

  const handleOnClick = () => {
    if (changePriority === "IMPORTANT" || changePriority === "REGULAR") {
      const newPriority = changePriority === "IMPORTANT" ? "REGULAR" : "IMPORTANT";
      setChangePriority(newPriority);
      editPriority({ id, newPriority });
    }
  };

  return (
    <tr>
      <td className='table-td'>
        <Checkbox />
      </td>
      <td>{fullName}</td>

      <td className='table-td'>
        <StyledPriority $props={changePriority}>
          <div onClick={() => setVisibleDropdown(!visibleDropdown)}>
            {changePriority} <LuChevronDown />
          </div>
          {visibleDropdown && (
            <StyledDropdown onClick={handleOnClick}>{changePriority === "REGULAR" ? "Important" : "Regular"}</StyledDropdown>
          )}
        </StyledPriority>
      </td>

      <td>
        <strong>
          <a href={`mailto:${email}`}>{email}</a>
        </strong>
      </td>
      <td>
        <strong>
          <a href={`tel:+${mobile_number}`}>{mobile_number}</a>
        </strong>
      </td>
      <td>
        {isMdScreen ? (
          <Dropdown>
            {editButton}
            {deleteButton}
            {viewButton}
          </Dropdown>
        ) : (
          <div>
            {editButton}
            {deleteButton}
            {viewButton}
          </div>
        )}
      </td>

      <Modal name={`edit-${id}`} onClose={() => dispatch(closeModalByName())}>
        <FormAddressBook addressBookToEdit={addressBook} />
      </Modal>

      <Modal name={`view-${id}`} onClose={() => dispatch(closeModalByName())}>
        <SingleAddressBook id={id} />
      </Modal>

      <Modal name={id} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={fullName} onConfirm={() => mutate(id)} onCloseModal={() => dispatch(closeModalByName())} />
      </Modal>
    </tr>
  );
}

export default AddressBookColumn;

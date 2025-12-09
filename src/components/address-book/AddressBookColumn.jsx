import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../ui/Button.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import FormAddressBook from "./FormAddressBook.jsx";
import Modal from "../Modal.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import SingleAddressBook from "./SingleAddressBook.jsx";

import styled from "styled-components";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import { useDeleteAddressBook, useEditAddressBookPriority } from "../../hooks/useAddressBook.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";

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

const Flex = styled.div`
  display: flex;
`;

const P = styled.div`
  text-align: start;
  width: max-content;
`;

function AddressBookColumn({ addressBook, selectedAddress, onCheckboxChange }) {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const { id, fullName, email, mobile_number, priority } = addressBook;
  const [changePriority, setChangePriority] = useState(priority);

  const isMdScreen = useMediaQuery(640); //min width 640px
  const dispatch = useDispatch();

  const { mutate } = useDeleteAddressBook();
  const { mutate: editPriority } = useEditAddressBookPriority();

  const editButton = (
    <Button $variation='icon' onClick={() => dispatch(openModalByName(`edit-${id}`))}>
      <Pencil size={18} />
      <P>Edit</P>
    </Button>
  );

  const deleteButton = (
    <Button $variation='icon' onClick={() => dispatch(openModalByName(id))}>
      <Trash2 size={18} />
      <P>Delete</P>
    </Button>
  );

  const viewButton = (
    <Button $variation='icon' onClick={() => dispatch(openModalByName(`view-${id}`))}>
      <Eye size={18} />
      <P>View</P>
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
        <Checkbox checked={selectedAddress.includes(id)} onChange={() => onCheckboxChange(id)} />
      </td>
      <td>{fullName}</td>

      <td className='table-td'>
        <StyledPriority $props={changePriority}>
          <Flex onClick={() => setVisibleDropdown(!visibleDropdown)}>
            {changePriority} <ChevronDown size={18} />
          </Flex>
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

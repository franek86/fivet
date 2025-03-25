import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

import Button from "../ui/Button.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import FormAddressBook from "./FormAddressBook.jsx";
import Modal from "../Modal.jsx";
import Table from "../ui/Table.jsx";

import { LuChevronDown, LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import { useDeleteAddressBook, useEditAddressBookPriority } from "../../hooks/useAddressBook.js";
import styled from "styled-components";

const StyledPriority = styled.div`
  background-color: ${({ $props }) => ($props === "REGULAR" ? "#c7d2fe" : "#99f6e4")};
  padding: 0.5rem 0.85rem;
  margin-left: 0.5rem;
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

function AddressBookColumn({ item }) {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const { id, full_name, email, mobile_number, priority } = item;
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
    <Link to={`${id}`}>
      <Button $variation='icon'>
        <LuEye />
        View
      </Button>
    </Link>
  );

  const handleOnClick = () => {
    if (changePriority === "IMPORTANT" || changePriority === "REGULAR") {
      const newPriority = changePriority === "IMPORTANT" ? "REGULAR" : "IMPORTANT";
      setChangePriority(newPriority);
      editPriority({ id, newPriority });
    }
  };

  return (
    <Table.Row>
      <Table.Column>
        {full_name}
        <StyledPriority $props={changePriority}>
          <div onClick={() => setVisibleDropdown(!visibleDropdown)}>
            {changePriority} <LuChevronDown />
          </div>
          {visibleDropdown && (
            <StyledDropdown onClick={handleOnClick}>{changePriority === "REGULAR" ? "Important" : "Regular"}</StyledDropdown>
          )}
        </StyledPriority>
      </Table.Column>

      <Table.Column>
        <strong>
          <a href={`mailto:${email}`}>{email}</a>
        </strong>
      </Table.Column>
      <Table.Column>
        <strong>
          <a href={`tel:+${mobile_number}`}>{mobile_number}</a>
        </strong>
      </Table.Column>
      <Table.Column>
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
      </Table.Column>

      <Modal name={`edit-${id}`} onClose={() => dispatch(closeModalByName())}>
        <FormAddressBook addressBookToEdit={item} />
      </Modal>

      <Modal name={id} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={id} onConfirm={() => mutate(id)} onCloseModal={() => dispatch(closeModalByName())} />
      </Modal>
    </Table.Row>
  );
}

export default AddressBookColumn;

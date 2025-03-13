import { useDispatch } from "react-redux";
import { Link } from "react-router";

import Button from "../ui/Button.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import FormAddressBook from "./FormAddressBook.jsx";
import Modal from "../Modal.jsx";
import Table from "../ui/Table.jsx";

import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import { useDeleteAddressBook } from "../../hooks/useAddressBook.js";

function AddressBookColumn({ item }) {
  const { id, first_name, last_name, email, mobile_number } = item;

  const isMdScreen = useMediaQuery(640); //min width 640px
  const dispatch = useDispatch();

  const { mutate } = useDeleteAddressBook();

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

  return (
    <Table.Row>
      <Table.Column>
        {first_name} {last_name}
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

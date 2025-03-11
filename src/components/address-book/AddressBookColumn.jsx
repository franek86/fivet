import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { PAGE_SIZE } from "../../utils/constants.js";

import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import FormAddressBook from "./FormAddressBook.jsx";
import Table from "../ui/Table.jsx";

import { LuPencil, LuTrash2 } from "react-icons/lu";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

function AddressBookColumn({ item, index }) {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const orderNumberItems = (currentPage - 1) * PAGE_SIZE + (index + 1);

  const { id, first_name } = item;

  const dispatch = useDispatch();
  return (
    <Table.Row>
      <Table.Column>{orderNumberItems}</Table.Column>
      <Table.Column>{first_name}</Table.Column>
      <Table.Column>{first_name}</Table.Column>
      <Table.Column>{first_name}</Table.Column>
      <Table.Column>{first_name}</Table.Column>
      <Table.Column>
        <Dropdown>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(`edit-${id}`))}>
            <LuPencil />
            Edit
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(id))}>
            <LuTrash2 />
            Delete
          </Button>
        </Dropdown>
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

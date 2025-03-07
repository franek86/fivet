import { useDispatch } from "react-redux";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";

import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import FormAddressBook from "./FormAddressBook.jsx";

function AddAddressBook() {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => dispatch(openModalByName("address-book"))}>Add contact</Button>
      <Modal name='address-book' onClose={() => dispatch(closeModalByName("address-book"))}>
        <FormAddressBook />
      </Modal>
    </>
  );
}

export default AddAddressBook;

import { useState } from "react";

/**
 * UI Components
 */
import Button from "../ui/Button.jsx";

import FormAddressBook from "./FormAddressBook.jsx";
import Drawer from "../Drawer.jsx";
import { useDispatch } from "react-redux";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

function AddAddressBook() {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => dispatch(openModalByName("create"))}>Add contact</Button>
      <Drawer name='create' title='Create contact' onClose={() => dispatch(closeModalByName("create"))}>
        <FormAddressBook />
      </Drawer>
    </>
  );
}

export default AddAddressBook;

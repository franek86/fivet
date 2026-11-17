import React from "react";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useDispatch } from "react-redux";

import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import { DangerButton } from "./Inquery.styles.js";
import { Trash2 } from "lucide-react";

function DeleteInquery({ onDelete, id, name }) {
  const dispatch = useDispatch();
  return (
    <>
      <DangerButton type='button' onClick={() => dispatch(openModalByName(id))}>
        <Trash2 size={16} />
        Delete
      </DangerButton>
      <Modal name={id} onClose={() => dispatch(closeModalByName(id))}>
        <ConfirmDialog itemName={name} onConfirm={onDelete} onCloseModal={() => dispatch(closeModalByName(id))} />
      </Modal>
    </>
  );
}

export default DeleteInquery;

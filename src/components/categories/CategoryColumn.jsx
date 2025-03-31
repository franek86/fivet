/* import Table from "../ui/Table.jsx"; */
import Dropdown from "../ui/Dropdown.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import CreateCategoryForm from "./CreateCategoryForm.jsx";
import Checkbox from "../ui/Checkbox.jsx";

import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";

import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory.js";
import { useDispatch } from "react-redux";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

function CategoryColumn({ category }) {
  const { id: categoryId, name, description } = category;
  const { mutate } = useDeleteCategory();
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <Checkbox />
      </td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <Dropdown>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(`edit-${categoryId}`))}>
            <LuPencil />
            Edit
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(categoryId))}>
            <LuTrash2 />
            Delete
          </Button>
        </Dropdown>
      </td>

      <Modal name={`edit-${categoryId}`} onClose={() => dispatch(closeModalByName())}>
        <CreateCategoryForm categoryToEdit={category} />
      </Modal>

      <Modal name={categoryId} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={name} onConfirm={() => mutate(categoryId)} onCloseModal={() => dispatch(closeModalByName())} />
      </Modal>
    </tr>
  );
}

export default CategoryColumn;

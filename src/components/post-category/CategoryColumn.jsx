/**
 * Third-party libraries
 */
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";

/**
 * Features
 */
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

/**
 * UI Components
 */
import Dropdown from "../ui/Dropdown.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import CreateCategoryForm from "./CreateCategoryForm.jsx";
import Checkbox from "../ui/Checkbox.jsx";

const P = styled.div`
  text-align: start;
  width: max-content;
`;

function CategoryColumn({ category, selectedCat, onCheckboxChange }) {
  const { id: categoryId, title } = category;
  const { mutate } = useDeleteCategory();
  const dispatch = useDispatch();

  return (
    <tr>
      <td className='table-td'>
        <Checkbox checked={selectedCat.includes(categoryId)} onChange={() => onCheckboxChange(categoryId)} />
      </td>
      <td>{title}</td>

      <td>
        <Dropdown>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(`edit-${categoryId}`))}>
            <Pencil size={18} />
            <P>Edit</P>
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(categoryId))}>
            <Trash2 size={18} />
            <P>Delete</P>
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

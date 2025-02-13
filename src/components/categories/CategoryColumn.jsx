import Table from "../ui/Table.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import CreateCategoryForm from "./CreateCategoryForm.jsx";

import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";

import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory.js";
import { useDispatch } from "react-redux";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants.js";

function CategoryColumn({ category, index }) {
  const { id: categoryId, name, description } = category;
  const { mutate } = useDeleteCategory();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  const orderNumberItems = (currentPage - 1) * PAGE_SIZE + (index + 1);

  return (
    <Table.Row>
      <Table.Column>
        <strong>{orderNumberItems}</strong>
      </Table.Column>
      <Table.Column>{name}</Table.Column>
      <Table.Column>{description}</Table.Column>
      <Table.Column>
        <Dropdown>
          <Button variation='icon' onClick={() => dispatch(openModalByName(`edit-${categoryId}`))}>
            <LuPencil />
            Edit
          </Button>
          <Button variation='icon' onClick={() => dispatch(openModalByName(categoryId))}>
            <LuTrash2 />
            Delete
          </Button>
        </Dropdown>
      </Table.Column>

      <Modal name={`edit-${categoryId}`} onClose={() => dispatch(closeModalByName())}>
        <CreateCategoryForm categoryToEdit={category} />
      </Modal>

      <Modal name={categoryId} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={name} onConfirm={() => mutate(categoryId)} onCloseModal={() => dispatch(closeModalByName())} />
      </Modal>
    </Table.Row>
  );
}

export default CategoryColumn;

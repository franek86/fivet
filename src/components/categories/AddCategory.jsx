/**
 * Third-party libraries
 */
import { useDispatch } from "react-redux";

/**
 * Features
 */
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";

/**
 * UI Components
 */
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import CreateCategoryForm from "./CreateCategoryForm.jsx";

function AddCategory() {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(openModalByName("create"))}>Add category</Button>

      <Modal name='create' onClose={() => dispatch(closeModalByName())}>
        <CreateCategoryForm />
      </Modal>
    </>
  );
}

export default AddCategory;

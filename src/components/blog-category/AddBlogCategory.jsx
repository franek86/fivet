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

function AddBlogCategory() {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(openModalByName("blog-category-create"))}>Add blog category</Button>

      <Modal name='blog-category-create' onClose={() => dispatch(closeModalByName("blog-category-create"))}>
        <CreateCategoryForm />
      </Modal>
    </>
  );
}

export default AddBlogCategory;

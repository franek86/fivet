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
import CreateCategoryForm from "./CreateCategoryForm.jsx";
import Drawer from "../Drawer.jsx";

function AddCategory() {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(openModalByName("create-cat"))}>Add category</Button>

      <Drawer name='create-cat' title='Create vessel category' onClose={() => dispatch(closeModalByName("create-cat"))}>
        <CreateCategoryForm />
      </Drawer>
    </>
  );
}

export default AddCategory;

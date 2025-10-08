import { useDispatch } from "react-redux";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import FormEvent from "./FormEvent.jsx";
import Drawer from "../ui/Drawer.jsx";
import { setIsDrawerOpen } from "../../slices/uiSlice.js";

function AddEvent() {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => dispatch(setIsDrawerOpen())}>Add event</Button>
      <Drawer>
        <FormEvent />
      </Drawer>
    </>
  );
}

export default AddEvent;

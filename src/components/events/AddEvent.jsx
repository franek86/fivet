import { useDispatch } from "react-redux";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import FormEvent from "./FormEvent.jsx";

function AddEvent() {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => dispatch(openModalByName("event"))}>Add event</Button>
      <Modal name='event' onClose={() => dispatch(closeModalByName("event"))}>
        <FormEvent />
      </Modal>
    </>
  );
}

export default AddEvent;

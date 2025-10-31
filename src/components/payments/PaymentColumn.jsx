import { useDispatch } from "react-redux";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import Button from "../ui/Button.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { customFormatDate } from "../../utils/formatDate.js";
import styled from "styled-components";
import { color } from "framer-motion";

const Status = styled.span`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "PAID":
        return "#15803d";
      case "FAILED":
        return "#b91c1c";
      case "CANCELED":
        return "#a16207";
      default:
        return "#fff";
    }
  }};
  color: var(--color-grey-0);
  display: inline-block;
  padding: 0.5rem;
  border-radius: var(--border-radius-md);
`;

function PaymentColumn({ data, selected, onCheckboxChange }) {
  const dispatch = useDispatch();
  const { id, userId, status, amount, currency, createdAt } = data;

  return (
    <tr>
      <td className='table-td'>
        <Checkbox checked={selected.includes(id)} onChange={() => onCheckboxChange(id)} />
      </td>
      <td>{userId}</td>
      <td>Plan</td>
      <td>{amount}</td>
      <td>{currency}</td>
      <td>{customFormatDate(createdAt)}</td>
      <td>
        <Status $status={status}>{status}</Status>
      </td>
      <td>
        <Dropdown>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(`edit-${id}`))}>
            <LuPencil />
            Edit
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(id))}>
            <LuTrash2 />
            Delete
          </Button>
        </Dropdown>
      </td>

      <Modal name={id} onClose={() => dispatch(closeModalByName(id))}>
        <ConfirmDialog itemName={id} onConfirm={() => mutate(categoryId)} onCloseModal={() => dispatch(closeModalByName(id))} />
      </Modal>
    </tr>
  );
}

export default PaymentColumn;

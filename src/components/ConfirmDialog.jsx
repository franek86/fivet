import styled from "styled-components";
import Title from "./ui/Title.jsx";
import Button from "./ui/Button.jsx";

const StyledConfirmDialog = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDialog({ itemName, onConfirm, onCloseModal }) {
  return (
    <StyledConfirmDialog>
      <Title tag='h3'>Delete {itemName}</Title>
      <p>Are you sure you want to delete this {itemName} permanently? This action cannot be undone.</p>

      <div>
        <Button $variation='third' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button $variation='danger' onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDialog>
  );
}

export default ConfirmDialog;

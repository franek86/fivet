import styled from "styled-components";
import { useDispatch } from "react-redux";

import Spinner from "../Spinner.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import { customFormatDate } from "../../utils/formatDate.js";

import { useDeleteUserProfile, useGetAllUserProfile } from "../../hooks/useProfile.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { UserRound } from "lucide-react";

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.article`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  padding: 20px;

  .card-body {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    img {
      width: 40px;
      height: 40px;
      border-radius: var(--border-radius-lg);
      background-color: var(--color-accent);
    }

    .card-content {
      .name {
        font-weight: 600;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CardButton = styled.div`
  background-color: var(--color-danger);
  color: var(--color-white);
  padding: 1rem;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);

  &:hover {
  }
`;

const CardButtonDelete = styled(CardButton)`
  &:hover {
    background-color: var(--color-danger);
  }
`;

const Link = styled.a`
  color: var(--color-text);
  font-size: 14px;
  &:hover {
    color: var(--color-accent-600);
  }
`;

const DateWrapp = styled.p`
  font-size: 1.25rem;
  padding-top: 0.8rem;
  color: var(--color-text-muted);
  font-style: italic;
`;

const CardImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-accent);
  border-radius: var(--border-radius-lg);
`;

const ActiveUser = styled("div")`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ $props }) => ($props ? "var(--color-success)" : "var(--color-danger)")};

  span {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    display: flex;
    background-color: ${({ $props }) => ($props ? "var(--color-success)" : "var(--color-danger)")};
    border-radius: 50%;
  }
`;

function UserProfileList() {
  const { data, isPending, isFetching } = useGetAllUserProfile();
  const { mutate } = useDeleteUserProfile();
  const dispatch = useDispatch();

  if (isPending) return <Spinner />;

  return (
    <>
      <CardWrap>
        {isFetching
          ? data.map((_, index) => <TablePlaceholder count={index} />)
          : data.map((item) => (
              <Card key={item.id}>
                <div className='header'>
                  <ActiveUser $props={item.isActive}>
                    <span></span>
                    {item.isActive ? "Online" : "Offline"}
                  </ActiveUser>
                </div>

                <div className='card-body'>
                  {item.profile.avatar ? (
                    <img src={item.profile.avatar} alt={item.fullName} />
                  ) : (
                    <CardImagePlaceholder>
                      <UserRound />
                    </CardImagePlaceholder>
                  )}
                  <div className='card-content'>
                    <div className='name'>{item.fullName}</div>
                    <Link href={`mailto:${item.email}`}>{item.email}</Link>
                  </div>
                </div>
                <div className='footer'>
                  <DateWrapp>Created at {customFormatDate(item.createdAt)}</DateWrapp>
                  {/*  <CardButtonEdit>Edit</CardButtonEdit> */}
                  <CardButtonDelete onClick={() => dispatch(openModalByName(item.id))}>Delete</CardButtonDelete>
                </div>
                <Modal name={item.id} onClose={() => dispatch(closeModalByName())}>
                  <ConfirmDialog
                    itemName={item.fullName}
                    onConfirm={() => mutate(item.id)}
                    onCloseModal={() => dispatch(closeModalByName())}
                  />
                </Modal>
              </Card>
            ))}
      </CardWrap>
    </>
  );
}

export default UserProfileList;

import styled from "styled-components";
import { useDispatch } from "react-redux";

import Spinner from "../Spinner.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";

import { customFormatDate } from "../../utils/formatDate.js";

import { useDeleteUserProfile, useGetAllUserProfile } from "../../hooks/useProfile.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { CircleUser } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../../shared/socket.js";
import { useEffect } from "react";

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const Card = styled.article`
  display: flex;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const CardTop = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
`;

const CardBottom = styled.div`
  display: grid;
  gap: 1.8rem;
  margin-right: 1.8rem;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardButton = styled.div`
  color: var(--color-grey-400);
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--color-grey-400);
  border-radius: 2rem;
`;

const CardButtonDelete = styled(CardButton)`
  &:hover {
    color: var(--color-grey-0);
    background-color: var(--color-red-700);
  }
`;

const CardImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-grey-200);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  color: var(--color-blue-500);
  font-size: 1.3rem;
  &:hover {
    color: var(--color-blue-700);
  }
`;

const DateWrapp = styled.p`
  font-size: 1.25rem;
  padding-top: 0.8rem;
  color: var(--color-grey-500);
  font-style: italic;
`;

const CardBoxPlaceholder = styled.div`
  background: var(--linear-gradient);
  background-size: 200% 100%;
  min-width: 100%;
  width: 100px;
  height: 20px;
`;

const CardImagePlaceholder = styled(CardImage)`
  background: var(--linear-gradient);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
`;

const CardContentPlaceholder = styled(CardContent)`
  gap: 1rem;
  animation: shimmer 1.5s infinite linear;
`;

const CardNameWrapp = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActiveUser = styled("div")`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ $props }) => ($props ? "#15803d" : "#b91c1c")};

  span {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    display: flex;
    background-color: ${({ $props }) => ($props ? "#15803d" : "#b91c1c")};
    border-radius: 50%;
  }
`;

// Placeholder component
function UserProfileListPlaceholder() {
  return (
    <Card>
      <CardTop>
        <CardContentPlaceholder>
          <CardBoxPlaceholder></CardBoxPlaceholder>
          <CardBoxPlaceholder></CardBoxPlaceholder>
          <CardBoxPlaceholder></CardBoxPlaceholder>
        </CardContentPlaceholder>
        <CardImagePlaceholder></CardImagePlaceholder>
      </CardTop>
      <CardBottom>
        <CardBoxPlaceholder></CardBoxPlaceholder>
        <CardBoxPlaceholder></CardBoxPlaceholder>
      </CardBottom>
    </Card>
  );
}

function UserProfileList() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, isFetching } = useGetAllUserProfile();
  const { mutate } = useDeleteUserProfile();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (onlineUsers) => {
      const onlineIds = new Set(onlineUsers.map((u) => u.id));

      queryClient.setQueriesData({ queryKey: ["all-profile"] }, (oldData) => {
        if (!oldData) return oldData;

        console.log(oldData);

        return oldData.map((user) => ({
          ...user,
          isActive: onlineIds.has(user.id),
        }));
      });
    };

    socket.on("online-users", handler);

    return () => {
      socket.off("online-users", handler);
    };
  }, [queryClient]);

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <>
      <CardWrap>
        {isFetching
          ? data.map((_, index) => <UserProfileListPlaceholder key={index} />)
          : data.map((item) => (
              <Card key={item.id}>
                <CardTop>
                  {item.profile.avatar ? <CardImage src={item.profile.avatar} alt={item.fullName} /> : <CircleUser size={40} />}
                  <CardContent>
                    <CardNameWrapp>
                      <strong>{item.fullName}</strong>
                    </CardNameWrapp>
                    <Link href={`mailto:${item.email}`}>{item.email}</Link>
                    <DateWrapp>Created at {customFormatDate(item.createdAt)}</DateWrapp>
                  </CardContent>
                </CardTop>
                <CardBottom>
                  <ActiveUser $props={item.isActive}>
                    <span></span>
                    {item.isActive ? "Online" : "Offline"}
                  </ActiveUser>

                  {/*  <CardButtonEdit>Edit</CardButtonEdit> */}
                  <CardButtonDelete onClick={() => dispatch(openModalByName(item.id))}>Delete</CardButtonDelete>
                </CardBottom>
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

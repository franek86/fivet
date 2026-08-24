import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Calendar1Icon, CalendarClock, TrashIcon, User, UserRound } from "lucide-react";

import Spinner from "../Spinner.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import { customFormatDate } from "../../utils/formatDate.js";

import { useDeleteUserProfile, useGetAllUserProfile } from "../../hooks/useProfile.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useAdminSocket } from "../../hooks/useAdminSocket.js";
import { getUserApi } from "../../services/apiUsers.js";
import Pagination from "../Pagination.jsx";
import Button from "../ui/Button.jsx";

/* const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
`;

const Card = styled.article`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  padding: 2rem;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
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
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .name {
        font-weight: 600;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
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
  text-align: center;
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
`; */

function UserProfileList() {
  const { data, isPending } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => getUserApi(),
    keepPreviousData: true,
  });

  const { mutate } = useDeleteUserProfile();
  const dispatch = useDispatch();

  useAdminSocket();

  if (isPending) return <Spinner />;

  return (
    <Page>
      <Container>
        <Header>
          <UserCount>{data.users.length} users</UserCount>
        </Header>

        <TableCard>
          <TableHeader>
            <HeaderCell>User</HeaderCell>
            <HeaderCell>Email</HeaderCell>
            <HeaderCell>Created at</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Verification</HeaderCell>
            <HeaderCell />
          </TableHeader>

          <UserRows>
            {data.users.map((user) => (
              <UserRow key={user.id}>
                <UserCell>
                  <AvatarWrapper>
                    {user.avatar ? <Avatar src={user.avatar} alt={user.fullName} /> : <UserRound />}

                    <StatusDot $online={user.online} />
                  </AvatarWrapper>

                  <UserInfo>
                    <UserName>{user.fullName}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                  </UserInfo>
                </UserCell>

                <EmailCell>{user.email}</EmailCell>

                <CreatedCell>
                  <CalendarClock size={14} />
                  {customFormatDate(user.createdAt)}
                </CreatedCell>

                <StatusCell>
                  <StatusBadge $online={user.online}>
                    <StatusIndicator $online={user.online} />
                    {user.online ? "Online" : "Offline"}
                  </StatusBadge>
                </StatusCell>

                <VerificationCell>
                  {user.verified ? (
                    <VerifiedBadge>
                      <CheckIcon>✓</CheckIcon>
                      Verified
                    </VerifiedBadge>
                  ) : (
                    <VerifyButton>Verify</VerifyButton>
                  )}
                </VerificationCell>

                <Actions>
                  <MoreButton aria-label={`Actions for ${user.fullName}`}>⋮</MoreButton>

                  <DeleteButton aria-label={`Delete ${user.fullName}`}>
                    <TrashIcon size={16} />
                    Delete
                  </DeleteButton>
                </Actions>
              </UserRow>
            ))}
          </UserRows>
        </TableCard>
      </Container>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  color: var(--color-text);
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.7px;
`;

const Subtitle = styled.p`
  margin: 7px 0 0;
  color: var(--color-text);
  font-size: 14px;
`;

const UserCount = styled.div`
  padding: 7px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fff;
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
`;

const TableCard = styled.div`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-white);
  box-shadow: var(--box-shadow-md);

  @media (max-width: 850px) {
    overflow-x: auto;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns:
    minmax(220px, 1.5fr)
    minmax(220px, 1.4fr)
    minmax(140px, 1fr)
    minmax(110px, 0.8fr)
    minmax(130px, 0.9fr)
    90px;

  min-width: 1000px;
  padding: 14px 20px;

  border-bottom: 1px solid var(--color-border);
`;

const HeaderCell = styled.div`
  color: var(--color-text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const UserRows = styled.div`
  min-width: 1000px;
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(220px, 1.5fr)
    minmax(220px, 1.4fr)
    minmax(140px, 1fr)
    minmax(110px, 0.8fr)
    minmax(130px, 0.9fr)
    90px;

  align-items: center;
  min-height: 78px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: var(--color-accent);
  }
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  /* width: 42px;
  height: 42px; */
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusDot = styled.span`
  position: absolute;
  right: -1px;
  bottom: 1px;
  width: 10px;
  height: 10px;
  border: 2px solid white;
  border-radius: 50%;
  background: ${({ $online }) => ($online ? "var(--color-success)" : "var(--color-danger)")};
`;

const UserInfo = styled.div`
  min-width: 0;
`;

const UserName = styled.div`
  margin-bottom: 3px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`;

const UserEmail = styled.div`
  max-width: 180px;
  overflow: hidden;
  color: var(--color-text);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmailCell = styled.div`
  color: var(--color-text);
  font-size: 13px;
  white-space: nowrap;
`;

const CreatedCell = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--color-text);
  font-size: 13px;
`;

const StatusCell = styled.div``;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 9px;
  border-radius: 999px;
  background: ${({ $online }) => ($online ? "#ecfdf3" : "#f3f4f6")};
  color: ${({ $online }) => ($online ? "var(--color-success)" : "var(--color-text)")};
  font-size: 12px;
  font-weight: 600;
`;

const StatusIndicator = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $online }) => ($online ? "var(--color-success)" : "var(--color-danger)")};
`;

const VerificationCell = styled.div``;

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-success);
  font-size: 12px;
  font-weight: 600;
`;

const CheckIcon = styled.span`
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-success);
  font-size: 11px;
`;

const VerifyButton = styled.button`
  border: 0;
  padding: 6px 11px;
  border-radius: 7px;
  background: var(--color-accent);
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-success);
    color: var(--color-white);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

const MoreButton = styled.button`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--color-text);
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background: #f1f2f4;
  }
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  padding: 7px 9px;
  border-radius: 7px;
  background: transparent;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-danger);
    color: var(--color-white);
  }
`;

export default UserProfileList;

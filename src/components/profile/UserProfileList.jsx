import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Calendar1Icon, CalendarClock, Eye, Pencil, Trash2, TrashIcon, User, UserRound } from "lucide-react";

import Spinner from "../Spinner.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import Pagination from "../Pagination.jsx";
import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import VerificationSelect from "./VerificationSelect.jsx";

import { customFormatDate } from "../../utils/formatDate.js";

import { getUserApi } from "../../services/apiUsers.js";
import { useDeleteUserProfile, useGetAllUserProfile, useUpdateUserProfileVerification } from "../../hooks/useProfile.js";
import { closeModalByName, openModalByName } from "../../slices/modalSlice.js";
import { useAdminSocket } from "../../hooks/useAdminSocket.js";
import { Link } from "react-router";

function UserProfileList() {
  const { data, isPending } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => getUserApi(),
    keepPreviousData: true,
  });

  const { mutate: updateVerification } = useUpdateUserProfileVerification();
  const { mutate } = useDeleteUserProfile();
  const dispatch = useDispatch();

  useAdminSocket();

  const getVerificationProfile = (user) => {
    if (user.brokerProfile) {
      return {
        type: "BROKER",
        status: user.brokerProfile.verificationStatus,
      };
    }

    if (user.ownerProfile) {
      return {
        type: "OWNER",
        status: user.ownerProfile.verificationStatus,
      };
    }

    return null;
  };

  const handleVerificationChange = (userId, verificationStatus) => {
    updateVerification({
      userId,
      verificationStatus,
    });
  };

  if (isPending) return <Spinner />;

  return (
    <Page>
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
          {data.users.map((user) => {
            const verification = getVerificationProfile(user);

            return (
              <UserRow key={user.id}>
                <UserCell>
                  <AvatarWrapper>
                    {user.avatar ? <Avatar src={user.avatar} alt={user.fullName} /> : <UserRound />}

                    <StatusDot $online={user.online} />
                  </AvatarWrapper>

                  <UserInfo>
                    <UserName>{user.fullName}</UserName>
                  </UserInfo>
                </UserCell>

                {/* Email */}
                <EmailCell>
                  <UserEmail>{user.email}</UserEmail>
                </EmailCell>

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
                  <VerificationSelect
                    value={user.brokerProfile?.verificationStatus ?? user.ownerProfile?.verificationStatus ?? "PENDING"}
                    onChange={(status) => handleVerificationChange(user.id, status)}
                    //isLoading={updateVerification.isPending && updateVerification.variables?.userId === user.id}
                  />
                </VerificationCell>

                <Dropdown>
                  <Button $variation='icon'>
                    <Link to={`${user.id}`}>
                      <ButtonInner>
                        <Eye size={16} />
                        <p>View</p>
                      </ButtonInner>
                    </Link>
                  </Button>
                  <Button $variation='icon'>
                    <Link to={`edit/${user.id}`}>
                      <ButtonInner>
                        <Pencil size={16} />
                        <p>Edit</p>
                      </ButtonInner>
                    </Link>
                  </Button>
                  <Button $variation='icon' onClick={() => dispatch(openModalByName(user.id))}>
                    <Trash2 size={16} />
                    <p>Delete</p>
                  </Button>
                </Dropdown>

                <Modal name={user.id} onClose={() => dispatch(closeModalByName())}>
                  <ConfirmDialog
                    itemName={user.fullName}
                    onConfirm={() => mutate(user.id)}
                    onCloseModal={() => dispatch(closeModalByName())}
                  />
                </Modal>
              </UserRow>
            );
          })}
        </UserRows>
      </TableCard>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  color: var(--text-color);
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    align-items: flex-start;
    margin-bottom: 18px;
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
    minmax(210px, 1.4fr)
    minmax(200px, 1.4fr)
    minmax(130px, 0.9fr)
    minmax(100px, 0.7fr)
    minmax(125px, 0.8fr)
    minmax(90px, 0.5fr);

  align-items: center;
  min-height: 48px;
  padding: 0 20px;
  border-bottom: 1px solid var(--color-border);

  @media (max-width: 1200px) {
    grid-template-columns:
      minmax(190px, 1.5fr)
      minmax(160px, 1.2fr)
      minmax(120px, 0.9fr)
      minmax(100px, 0.8fr)
      minmax(110px, 0fr)
      0px;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const HeaderCell = styled.div`
  color: var(--color-text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const UserRows = styled.div`
  height: 100vh;
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(210px, 1.4fr)
    minmax(200px, 1.4fr)
    minmax(130px, 0.9fr)
    minmax(100px, 0.7fr)
    minmax(125px, 0.8fr)
    minmax(90px, 0.5fr);

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

  @media (max-width: 1200px) {
    grid-template-columns:
      minmax(190px, 1.5fr)
      minmax(160px, 1.2fr)
      minmax(120px, 0.9fr)
      minmax(100px, 0.8fr)
      minmax(110px, 0fr)
      0px;

    padding-left: 16px;
    padding-right: 16px;
  }

  /*
    Mobile:
    Convert the entire row into a card.
  */
  @media (max-width: 760px) {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0;
    min-height: 0;
    margin: 12px;
    padding: 18px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-white);

    &:last-child {
      border-bottom: 1px solid var(--color-border);
    }

    &:hover {
      background: var(--color-white);
      box-shadow: var(--box-shadow-md);
    }
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 0.7rem;
    margin: 10px;
    padding: 16px;
    border-radius: 11px;
  }
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 12px;

  @media (max-width: 760px) {
    grid-column: 1 / -1;
    width: 100%;
    border-bottom: 1px solid var(--color-border);
  }
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
  min-width: 0;

  @media (max-width: 760px) {
    grid-column: 1 / -1;
    padding-top: 15px;
  }
`;

const CreatedCell = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--color-text);
  font-size: 13px;
`;

const StatusCell = styled.div`
  @media (max-width: 1200px) {
    display: none;
    padding-top: 14px;
  }
`;

const MobileEmail = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: block;
    max-width: min(55vw, 280px);
    margin-top: 4px;
    overflow: hidden;
    color: var(--color-text);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MobileStatus = styled.div`
  display: none;

  @media (max-width: 760px) {
    display: block;
    margin-left: auto;
  }
`;

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
  color: ${({ $status }) => {
    switch ($status) {
      case "PENDING":
        return "var(--color-accent-600)";
      case "VERIFIED":
        return "var(--color-success)";
      case "REJECTED":
        return "var(--color-danger)";
      case "SUSPENDED":
        return "var(--color-danger)";
      default:
        return "var(--color-text-muted)";
    }
  }};
  font-size: 12px;
  font-weight: 600;
`;

const CheckIcon = styled.span`
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  border-radius: 50%;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "PENDING":
        return "var(--color-accent-600)";
      case "VERIFIED":
        return "var(--color-success)";
      case "REJECTED":
        return "var(--color-danger)";
      case "SUSPENDED":
        return "var(--color-danger)";
      default:
        return "var(--color-text-muted)";
    }
  }};
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

const UserTable = styled.section`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-white);
  box-shadow: var(--box-shadow-md);
`;

const Column = styled.div`
  color: var(--color-text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`;

const UserListContainer = styled.div`
  width: 100%;
`;

export default UserProfileList;

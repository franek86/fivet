import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getOwnerLists } from "../../services/apiUsers.js";
import Spinner from "../Spinner.jsx";

const OwnerList = ({ onSendRequest }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["owners"],
    queryFn: getOwnerLists,
  });

  const getStatus = (owner) => {
    if (!owner.brokerAssignmentsAsOwner?.status) return "NOT_CONNECTED";

    return owner.brokerAssignmentsAsOwner?.status;
  };

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <Header>
        <div>
          <Title>Owners</Title>
          <Subtitle>Find verified owners and connect with them.</Subtitle>
        </div>

        <Count>{data.owners?.length} owners</Count>
      </Header>

      <OwnerListWrapper>
        {data.owners.map((owner) => {
          const status = getStatus(owner);

          return (
            <OwnerCard key={owner.id}>
              <OwnerInfo>
                <Avatar>
                  {owner.company?.logo ? (
                    <AvatarImage src={owner.company?.logo} alt={owner.fullName} />
                  ) : (
                    owner.fullName?.charAt(0).toUpperCase()
                  )}
                </Avatar>

                <Info>
                  <Name>{owner.fullName}</Name>

                  {owner.company && <Company>{owner.company?.name}</Company>}

                  <Location>
                    {owner.company?.city && owner.company?.country
                      ? `${owner.company?.city}, ${owner.company?.country}`
                      : owner.company?.country || "Location not available"}
                  </Location>
                </Info>
              </OwnerInfo>

              <RightSide>
                <Verification $verificationStatus={owner.ownerProfile?.verificationStatus}>
                  <StatusDot $verificationStatus={owner.ownerProfile?.verificationStatus} />
                  Verificaton: {owner.ownerProfile?.verificationStatus}
                </Verification>

                <Action>
                  {status === "PENDING" && (
                    <StatusButton $status='PENDING' disabled>
                      Request pending
                    </StatusButton>
                  )}
                  {status === "ACCEPTED" && (
                    <StatusButton $status='ACCEPTED' disabled>
                      Connected
                    </StatusButton>
                  )}
                  {status === "DECLINED" && (
                    <Button onClick={() => onSendRequest(owner.id)} disabled={isLoading}>
                      Send request
                    </Button>
                  )}
                  {status === "REVOKED" && (
                    <Button onClick={() => onSendRequest(owner.id)} disabled={isLoading}>
                      Send request
                    </Button>
                  )}
                  {status === "NOT_CONNECTED" && (
                    <Button onClick={() => onSendRequest(owner.id)} disabled={isLoading}>
                      Send request
                    </Button>
                  )}
                </Action>
              </RightSide>
            </OwnerCard>
          );
        })}
      </OwnerListWrapper>
    </Container>
  );
};

export default OwnerList;

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
`;

const Subtitle = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: var(--color-text-muted);
`;

const Count = styled.span`
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--color-grey-200);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
`;

const OwnerListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OwnerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 16px 18px;

  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--color-border);
    box-shadow: var(--shadow-lg);
  }
`;

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

const Avatar = styled.div`
  width: 46px;
  height: 46px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: var(--color-accent);

  color: var(--color-accent-600);
  font-size: 16px;
  font-weight: 700;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const Info = styled.div`
  min-width: 0;
`;

const Name = styled.div`
  color: var(--color-text);
  font-size: 15px;
  font-weight: 600;
`;

const Company = styled.div`
  margin-top: 3px;
  color: var(--color-text-muted);
  font-size: 13px;
`;

const Location = styled.div`
  margin-top: 3px;
  color: #9ca3af;
  font-size: 12px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
`;

const Verification = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: ${({ $verificationStatus }) => {
    switch ($verificationStatus) {
      case "VERIFIED":
        return "var(--color-success)";

      case "REJECTED":
        return "var(--color-danger)";

      case "SUSPENDED":
        return "var(--color-warning)";

      case "PENDING":
      default:
        return "var(--color-accent-600)";
    }
  }};
  font-size: 12px;
  font-weight: 600;
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ $verificationStatus }) => {
    switch ($verificationStatus) {
      case "VERIFIED":
        return "var(--color-success)";

      case "REJECTED":
        return "var(--color-danger)";

      case "SUSPENDED":
        return "var(--color-warning)";

      case "PENDING":
      default:
        return "var(--color-accent-600)";
    }
  }};
`;

const Action = styled.div`
  min-width: 130px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;

  padding: 9px 14px;

  background: var(--color-accent-600);
  color: var(--color-white);

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 9px 14px;

  font-size: 13px;
  font-weight: 600;

  cursor: default;

  background: ${({ $status }) => ($status === "ACCEPTED" ? "#dcfce7" : "#fef3c7")};

  color: ${({ $status }) => ($status === "ACCEPTED" ? "#166534" : "#92400e")};
`;

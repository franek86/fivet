import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../Spinner.jsx";
import { getVerifedBrokerLists } from "../../services/apiUsers.js";

const getStatus = (status) => {
  switch (status) {
    case "PENDING":
      return {
        label: "Request sent",
        type: "pending",
      };

    case "ACCEPTED":
      return {
        label: "Connected",
        type: "accepted",
      };

    case "DECLINED":
      return {
        label: "Declined",
        type: "declined",
      };

    default:
      return {
        label: "Not contacted",
        type: "default",
      };
  }
};

const VerifiedBrokers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["brokers"],
    queryFn: getVerifedBrokerLists,
  });

  if (isLoading) return <Spinner />;

  console.log(data);

  const handleContact = (broker) => {
    console.log("Contact broker:", broker.id);
  };

  return (
    <div>
      <Header>
        <div>
          <Title>Verified Brokers</Title>
          <Subtitle>Connect with verified brokers to help sell or manage your vessel.</Subtitle>
        </div>

        <SearchInput type='text' placeholder='Search brokers...' />
      </Header>

      <BrokerGrid>
        {data?.brokers.map((broker) => {
          const status = getStatus(broker.requestStatus);

          return (
            <BrokerCard key={broker.id}>
              <CardTop>
                <Avatar>{broker.company?.logo}</Avatar>

                <VerifiedBadge>
                  <CheckIcon>✓</CheckIcon>
                  Verified
                </VerifiedBadge>
              </CardTop>

              <BrokerName>{broker.fullName}</BrokerName>

              <Company>{broker.company?.name}</Company>

              <Location>
                <LocationIcon>⌖</LocationIcon>
                {broker.company?.country}
              </Location>

              <Divider />

              <CardBottom>
                <Status $type={status.type}>
                  <StatusDot $type={status.type} />
                  {status.label}
                </Status>

                {broker.requestStatus === "NONE" && <ContactButton onClick={() => handleContact(broker)}>Contact Broker</ContactButton>}

                {broker.requestStatus === "PENDING" && <DisabledButton disabled>Request Pending</DisabledButton>}

                {broker.requestStatus === "ACCEPTED" && <ContactButton onClick={() => handleContact(broker)}>Message Broker</ContactButton>}

                {broker.requestStatus === "DECLINED" && (
                  <ContactButton $secondary onClick={() => handleContact(broker)}>
                    Send Again
                  </ContactButton>
                )}
              </CardBottom>
            </BrokerCard>
          );
        })}
      </BrokerGrid>
    </div>
  );
};

export default VerifiedBrokers;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
`;

const Subtitle = styled.p`
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
`;

const SearchInput = styled.input`
  width: 260px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: var(--color-grey-200);
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const BrokerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const BrokerCard = styled.div`
  padding: 20px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: 0.2s ease;

  &:hover {
    border-color: var(--color-grey-200);
    box-shadow: var(--shadow-md);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-text);
  font-weight: 700;
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 999px;
  background: var(--color-success-600);
  color: var(--color-success);
  font-size: 11px;
  font-weight: 600;
`;

const CheckIcon = styled.span`
  font-size: 11px;
`;

const BrokerName = styled.h3`
  margin: 0 0 5px;
  font-size: 17px;
  color: var(--color-text);
`;

const Company = styled.div`
  font-size: 13px;
  color: var(--color-text-muted);
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
`;

const LocationIcon = styled.span`
  font-size: 15px;
`;

const Divider = styled.div`
  height: 1px;
  margin: 18px 0;
  background: var(--color-grey-200);
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $type }) => {
    if ($type === "pending") return "var(--color-warning-600)";
    if ($type === "accepted") return "var(--color-success-600)";
    if ($type === "declined") return "var(--color-danger-600)";
    return "#6b7280";
  }};
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $type }) => {
    if ($type === "pending") return "var(--color-warning-600)";
    if ($type === "accepted") return "var(--color-success-600)";
    if ($type === "declined") return "var(--color-danger-600)";
    return "#9ca3af";
  }};
`;

const ContactButton = styled.button`
  border: none;
  border-radius: 9px;
  padding: 9px 13px;
  background: ${({ $secondary }) => ($secondary ? "var(--color-accent)" : "var(--color-text)")};
  color: ${({ $secondary }) => ($secondary ? "var(--color-text)" : "var(--color-white)")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const DisabledButton = styled.button`
  border: none;
  border-radius: 9px;
  padding: 9px 13px;
  background: var(--color-grey-200);
  color: var(--color-text);
  font-size: 12px;
  font-weight: 600;
  cursor: not-allowed;
`;

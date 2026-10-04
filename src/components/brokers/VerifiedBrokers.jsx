import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Anchor, MessageCircleMore } from "lucide-react";

import { getVerifedBrokerLists } from "../../services/apiUsers.js";
import { updateBrokerRequestToUser } from "../../services/apiBrokerAssignment.js";
import { useDebounce } from "../../hooks/useDebounce.js";

import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import EmtpyFilterState from "../ui/EmtpyFilterState.jsx";
import EmptyState from "../EmptyState.jsx";
import Pagination from "../Pagination.jsx";
import { PAGE_SIZE } from "../../constants/index.js";
import VerifiedBrokersHeader from "./VerifiedBrokersHeader.jsx";

const getStatus = (status) => {
  switch (status) {
    case "PENDING":
      return {
        label: "New request",
        type: "pending",
      };

    case "ACCEPTED":
      return {
        label: "Connected",
        type: "accepted",
      };

    case "REJECTED":
      return {
        label: "Rejected",
        type: "rejected",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        type: "cancelled",
      };

    default:
      return {
        label: "Not contacted",
        type: "default",
      };
  }
};

const DEFAULT_FILTERS = {
  page: 1,
  limit: PAGE_SIZE,
  sortBy: "createdAt",
  order: "desc",
};

const VerifiedBrokers = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchBrokers = useSelector((state) => state.search.verifiedBrokers);
  const debouncedSearch = useDebounce(searchBrokers, 500);

  console.log(searchBrokers);

  //Local state
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  //Get verified broker
  const { data, isLoading } = useQuery({
    queryKey: ["brokers", { ...filters, search: debouncedSearch }],
    queryFn: () => getVerifedBrokerLists({ ...filters, search: debouncedSearch }),
  });

  //Update broker request
  const { mutate, isPending } = useMutation({
    mutationFn: ({ brokerId, id, status }) => updateBrokerRequestToUser({ brokerId, id, status }),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries(["brokers"]);
      queryClient.invalidateQueries(["owners"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleContact = () => {
    navigate("/owner/chat");
  };

  const handleAcceptRequest = (broker) => {
    mutate({
      brokerId: broker.id,
      status: "ACCEPTED",
    });
  };
  const handleCancelRequest = (broker) => {
    //console.log(broker.brokerRequestsSent[0].id);
    mutate({
      brokerId: broker.id,
      id: broker.brokerRequestsSent[0].id,
      status: "CANCELLED",
    });
  };

  const handleRejectRequest = (broker) => {
    mutate({
      brokerId: broker.id,
      status: "REJECTED",
    });
  };

  /* Current filters */
  const hasFilters = Boolean(filters.search);

  /* Reset filters */
  const resetFilters = () => {
    dispatch(setClearSearch("verifiedBrokers"));
    setFilters(DEFAULT_FILTERS);
  };

  if (isLoading) return <TablePlaceholder count={filters.limit} />;

  if (!isLoading && data.owners?.length < 1) {
    if (!hasFilters) {
      return <EmtpyFilterState title='No verified brokers match in your filters' onHandleReset={resetFilters} />;
    }

    return (
      <EmptyState message='No verified brokers' icon={<Anchor />}>
        <p>Brokres must by verifed by admin.</p>
      </EmptyState>
    );
  }

  return (
    <div>
      <VerifiedBrokersHeader />
      <BrokerGrid>
        {data?.brokers.map((broker) => {
          const dataStatus = broker?.brokerRequestsSent?.[0]?.status;

          const status = getStatus(dataStatus);

          return (
            <BrokerCard key={broker.id}>
              <CardTop>
                <Avatar src={broker.company?.logo} />

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

                {status.type === "default" && <ContactButton onClick={() => handleContact(broker)}>Contact Broker</ContactButton>}
                {status.type === "rejected" && <ContactButton onClick={() => handleContact(broker)}>Contact Broker</ContactButton>}

                {status.type === "pending" && (
                  <div className='btn-group'>
                    <PendingButton onClick={() => handleAcceptRequest(broker)}>
                      {isPending ? "Accpeting..." : "Accept request"}
                    </PendingButton>
                    <RejectButton onClick={() => handleRejectRequest(broker)}>Reject</RejectButton>
                  </div>
                )}

                {status.type === "accepted" && (
                  <div className='btn-group'>
                    <ChatButton onClick={() => handleContact(broker)}>
                      <MessageCircleMore size={16} /> Chat
                    </ChatButton>
                    <ContactButton $secondary onClick={() => handleCancelRequest(broker)}>
                      Delete
                    </ContactButton>
                  </div>
                )}

                {status.type === "cancelled" && <ContactButton onClick={() => handleContact(broker)}>Contact broker</ContactButton>}
              </CardBottom>
            </BrokerCard>
          );
        })}
      </BrokerGrid>
      <Pagination
        count={data.meta?.total}
        page={filters.page}
        limit={filters.limit}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </div>
  );
};

export default VerifiedBrokers;

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

const Avatar = styled.img`
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

  .btn-group {
    display: flex;
    gap: 1rem;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $type }) => {
    if ($type === "pending") return "var(--color-accent-600)";
    if ($type === "accepted") return "var(--color-success-600)";
    if ($type === "cancelled") return "var(--color-danger-600)";
    return "var(--color-text)";
  }};
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $type }) => {
    if ($type === "pending") return "var(--color-accent-600)";
    if ($type === "accepted") return "var(--color-success-600)";
    if ($type === "cancelled") return "var(--color-danger-600)";
    return "var(--color-text)";
  }};
`;

const ContactButton = styled.button`
  border: none;
  border-radius: 9px;
  padding: 9px 13px;
  background: ${({ $secondary }) => ($secondary ? "var(--color-danger-600)" : "var(--color-text)")};
  color: var(--color-white);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const PendingButton = styled.button`
  border: none;
  border-radius: 9px;
  padding: 9px 13px;
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;

const RejectButton = styled.button`
  border: var(--color-danger-600);
  border-radius: 9px;
  padding: 9px 13px;
  background: var(--color-danger-600);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;

const ChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: var(--color-success-600);
  border-radius: 9px;
  padding: 9px 13px;
  background: var(--color-success-600);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;

import { useState } from "react";
import styled from "styled-components";
import { Search, MoreVertical, Send, Ship, Mail, Phone, User, Clock, CheckCircle, AlertCircle } from "lucide-react";

const enquiries = [
  {
    id: 1,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+44 7700 900123",
    subject: "Interested in MT Ocean Star",
    message:
      "Hello, I am interested in the MT Ocean Star tanker. Could you please provide me with the current asking price and vessel specifications?",
    vessel: "MT Ocean Star",
    vesselId: "VSL-001",
    date: "Today, 10:42",
    status: "NEW",
  },
  {
    id: 2,
    name: "James Anderson",
    email: "james@example.com",
    phone: "+1 202 555 0198",
    subject: "Request for vessel information",
    message: "I would like to know more about the vessel including its current location, DWT and inspection history.",
    vessel: "MT Pacific Trader",
    vesselId: "VSL-004",
    date: "Today, 09:18",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "michael@example.com",
    phone: "+49 151 1234567",
    subject: "General enquiry",
    message: "Can you provide more information about your vessel marketplace and the purchasing process?",
    vessel: null,
    vesselId: null,
    date: "Yesterday",
    status: "RESOLVED",
  },
  {
    id: 4,
    name: "Daniel Wilson",
    email: "daniel@example.com",
    phone: "+33 6 12 34 56 78",
    subject: "Vessel availability",
    message: "Is the vessel still available for purchase?",
    vessel: "MT Atlantic",
    vesselId: "VSL-007",
    date: "Yesterday",
    status: "NEW",
  },
];

export default function EnquiriesCard() {
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiries[0]);
  const [reply, setReply] = useState("");

  const handleReply = (e) => {
    e.preventDefault();

    if (!reply.trim()) return;

    console.log("Send reply:", {
      enquiryId: selectedEnquiry.id,
      message: reply,
    });

    setReply("");
  };

  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>Enquiries</PageTitle>
          <PageDescription>Manage enquiries received from website visitors.</PageDescription>
        </div>

        <Stats>
          <Stat>
            <StatNumber>12</StatNumber>
            <StatLabel>Total</StatLabel>
          </Stat>

          <Stat>
            <StatNumber>4</StatNumber>
            <StatLabel>New</StatLabel>
          </Stat>

          <Stat>
            <StatNumber>3</StatNumber>
            <StatLabel>In progress</StatLabel>
          </Stat>
        </Stats>
      </PageHeader>

      <EnquiryLayout>
        {/* =========================
            Enquiry List
        ========================= */}

        <EnquirySidebar>
          <SidebarHeader>
            <SidebarTitle>Inbox</SidebarTitle>

            <UnreadBadge>4</UnreadBadge>
          </SidebarHeader>

          <SearchBox>
            <Search size={17} />

            <SearchInput placeholder='Search enquiries...' />
          </SearchBox>

          <Filters>
            <FilterButton $active>All</FilterButton>

            <FilterButton>New</FilterButton>

            <FilterButton>In progress</FilterButton>
          </Filters>

          <EnquiryList>
            {enquiries.map((enquiry) => (
              <EnquiryItem key={enquiry.id} $active={selectedEnquiry.id === enquiry.id} onClick={() => setSelectedEnquiry(enquiry)}>
                <Avatar>
                  {enquiry.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}

                  {enquiry.status === "NEW" && <NewDot />}
                </Avatar>

                <EnquiryItemContent>
                  <EnquiryItemTop>
                    <CustomerName>{enquiry.name}</CustomerName>

                    <EnquiryDate>{enquiry.date}</EnquiryDate>
                  </EnquiryItemTop>

                  <Subject>{enquiry.subject}</Subject>

                  <Preview>{enquiry.message}</Preview>

                  <ItemBottom>
                    <Status $status={enquiry.status}>
                      {enquiry.status === "NEW" && <AlertCircle size={11} />}

                      {enquiry.status === "IN_PROGRESS" && <Clock size={11} />}

                      {enquiry.status === "RESOLVED" && <CheckCircle size={11} />}

                      {formatStatus(enquiry.status)}
                    </Status>
                  </ItemBottom>
                </EnquiryItemContent>
              </EnquiryItem>
            ))}
          </EnquiryList>
        </EnquirySidebar>

        {/* =========================
            Enquiry Details
        ========================= */}

        <EnquiryContent>
          <EnquiryHeader>
            <CustomerInfo>
              <Avatar $large>
                {selectedEnquiry.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </Avatar>

              <div>
                <CustomerName $large>{selectedEnquiry.name}</CustomerName>

                <CustomerEmail>{selectedEnquiry.email}</CustomerEmail>
              </div>
            </CustomerInfo>

            <HeaderActions>
              <StatusSelect
                value={selectedEnquiry.status}
                onChange={(e) => {
                  console.log("Change status:", e.target.value);
                }}
              >
                <option value='NEW'>New</option>
                <option value='IN_PROGRESS'>In progress</option>
                <option value='RESOLVED'>Resolved</option>
              </StatusSelect>
            </HeaderActions>
          </EnquiryHeader>

          <EnquiryBody>
            {/* Customer information */}

            <InfoCard>
              <InfoCardTitle>Contact information</InfoCardTitle>

              <InfoGrid>
                <InfoItem>
                  <InfoIcon>
                    <Mail size={16} />
                  </InfoIcon>

                  <div>
                    <InfoLabel>Email</InfoLabel>
                    <InfoValue>{selectedEnquiry.email}</InfoValue>
                  </div>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <Phone size={16} />
                  </InfoIcon>

                  <div>
                    <InfoLabel>Phone</InfoLabel>
                    <InfoValue>{selectedEnquiry.phone}</InfoValue>
                  </div>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <User size={16} />
                  </InfoIcon>

                  <div>
                    <InfoLabel>Customer</InfoLabel>
                    <InfoValue>Website visitor</InfoValue>
                  </div>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <Clock size={16} />
                  </InfoIcon>

                  <div>
                    <InfoLabel>Received</InfoLabel>
                    <InfoValue>{selectedEnquiry.date}</InfoValue>
                  </div>
                </InfoItem>
              </InfoGrid>
            </InfoCard>

            {/* Vessel information */}

            {selectedEnquiry.vessel && (
              <VesselCard>
                <VesselIcon>
                  <Ship size={20} />
                </VesselIcon>

                <div>
                  <VesselLabel>Enquiry about vessel</VesselLabel>

                  <VesselName>{selectedEnquiry.vessel}</VesselName>

                  <VesselId>{selectedEnquiry.vesselId}</VesselId>
                </div>

                <ViewVesselButton>View vessel</ViewVesselButton>
              </VesselCard>
            )}

            {/* Original message */}

            <MessageSection>
              <SectionTitle>Enquiry</SectionTitle>

              <MessageCard>
                <MessageHeader>
                  <div>
                    <MessageAuthor>{selectedEnquiry.name}</MessageAuthor>

                    <MessageSubject>{selectedEnquiry.subject}</MessageSubject>
                  </div>

                  <MessageDate>{selectedEnquiry.date}</MessageDate>
                </MessageHeader>

                <MessageText>{selectedEnquiry.message}</MessageText>
              </MessageCard>
            </MessageSection>
          </EnquiryBody>

          {/* Reply */}

          <ReplyArea>
            <ReplyForm onSubmit={handleReply}>
              <ReplyInput value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Write a reply to the customer...' />

              <ReplyFooter>
                <ReplyHint>
                  Reply will be sent to <strong>{selectedEnquiry.email}</strong>
                </ReplyHint>

                <SendButton type='submit' disabled={!reply.trim()}>
                  <Send size={16} />
                  Send reply
                </SendButton>
              </ReplyFooter>
            </ReplyForm>
          </ReplyArea>
        </EnquiryContent>
      </EnquiryLayout>
    </Page>
  );
}

function formatStatus(status) {
  switch (status) {
    case "NEW":
      return "New";

    case "IN_PROGRESS":
      return "In progress";

    case "RESOLVED":
      return "Resolved";

    default:
      return status;
  }
}

/* =====================================================
   PAGE
===================================================== */

const Page = styled.div`
  width: 100%;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  margin: 0;

  font-size: 24px;
  font-weight: 600;

  color: var(--color-text);
`;

const PageDescription = styled.p`
  margin: 6px 0 0;

  font-size: 14px;

  color: var(--color-text-muted);
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const Stat = styled.div`
  text-align: right;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
`;

const StatLabel = styled.div`
  margin-top: 2px;

  font-size: 12px;
  color: var(--color-text-muted);
`;

/* =====================================================
   LAYOUT
===================================================== */

const EnquiryLayout = styled.div`
  height: 720px;

  display: flex;

  background: var(--color-white);

  border: 1px solid var(--color-border);
  border-radius: 12px;

  overflow: hidden;
`;

/* =====================================================
   SIDEBAR
===================================================== */

const EnquirySidebar = styled.aside`
  width: 360px;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;

  border-right: 1px solid var(--color-border);
`;

const SidebarHeader = styled.div`
  height: 64px;

  padding: 0 18px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-bottom: 1px solid var(--color-border);
`;

const SidebarTitle = styled.h2`
  margin: 0;

  font-size: 16px;
  font-weight: 600;

  color: var(--color-text);
`;

const UnreadBadge = styled.span`
  min-width: 20px;
  height: 20px;

  padding: 0 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: var(--color-accent);
  color: var(--color-white);

  font-size: 11px;
  font-weight: 600;
`;

const SearchBox = styled.div`
  margin: 14px 16px 10px;

  height: 38px;

  padding: 0 11px;

  display: flex;
  align-items: center;
  gap: 8px;

  background: var(--color-bg);

  border-radius: 7px;

  color: var(--color-text-muted);
`;

const SearchInput = styled.input`
  width: 100%;

  border: none;
  outline: none;

  background: transparent;

  font-size: 13px;

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const Filters = styled.div`
  padding: 0 16px 12px;

  display: flex;
  gap: 6px;
`;

const FilterButton = styled.button`
  padding: 6px 10px;

  border: 1px solid ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-border)")};

  border-radius: 6px;

  background: ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-bg)")};

  color: ${({ $active }) => ($active ? "var(--color-white)" : "var(--color-accent)")};

  font-size: 12px;

  cursor: pointer;
`;

const EnquiryList = styled.div`
  flex: 1;

  overflow-y: auto;
`;

const EnquiryItem = styled.div`
  padding: 14px 16px;

  display: flex;
  gap: 11px;

  cursor: pointer;

  background: ${({ $active }) => ($active ? "var(--color-bg)" : "var(--color-white)")};

  border-left: 3px solid ${({ $active }) => ($active ? "var(--color-accent)" : "transparent")};

  &:hover {
    background: var(--color-border);
  }
`;

const EnquiryItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const EnquiryItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const CustomerName = styled.div`
  font-size: ${({ $large }) => ($large ? "16px" : "13px")};

  font-weight: 600;

  color: var(--color-text);
`;

const EnquiryDate = styled.span`
  flex-shrink: 0;

  font-size: 10px;

  color: var(--color-text-muted);
`;

const Subject = styled.div`
  margin-top: 4px;

  font-size: 12px;
  font-weight: 500;

  color: var(--color-accent-600);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Preview = styled.div`
  margin-top: 4px;

  font-size: 12px;

  line-height: 1.4;

  color: var(--color-text-muted);

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
`;

const ItemBottom = styled.div`
  margin-top: 7px;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  padding: 3px 7px;

  border-radius: 4px;

  font-size: 10px;
  font-weight: 500;

  color: ${({ $status }) => {
    if ($status === "NEW") return "var(--color-white)";
    if ($status === "IN_PROGRESS") return "var(--color-warning)";
    return "var(--color-success)";
  }};

  background: ${({ $status }) => {
    if ($status === "NEW") return "var(--color-accent)";
    if ($status === "IN_PROGRESS") return "var(--color-warning-600)";
    return "var(--color-success-600)";
  }};
`;

const Avatar = styled.div`
  position: relative;

  width: ${({ $large }) => ($large ? "42px" : "38px")};

  height: ${({ $large }) => ($large ? "42px" : "38px")};

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-border);

  color: var(--color-text);

  font-size: 12px;
  font-weight: 600;
`;

const NewDot = styled.span`
  position: absolute;

  right: -1px;
  bottom: -1px;

  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: var(--color-accent);

  border: 2px solid var(--color-white);
`;

/* =====================================================
   CONTENT
===================================================== */

const EnquiryContent = styled.main`
  flex: 1;

  min-width: 0;

  display: flex;
  flex-direction: column;
`;

const EnquiryHeader = styled.header`
  height: 70px;

  padding: 0 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--color-border);
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const CustomerEmail = styled.div`
  margin-top: 3px;

  font-size: 12px;

  color: var(--color-text-muted);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusSelect = styled.select`
  height: 34px;

  padding: 0 10px;

  border: 1px solid var(--color-border);
  border-radius: 6px;

  background: var(--color-white);

  color: var(--color-text);

  font-size: 12px;

  outline: none;

  &:focus {
    border-color: var(--color-accent);
  }
`;

const IconButton = styled.button`
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  background: transparent;

  color: var(--color-text-muted);

  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background: var(--color-bg);
  }
`;

const EnquiryBody = styled.div`
  flex: 1;

  padding: 22px;

  overflow-y: auto;

  background: var(--color-gray-200);
`;

/* =====================================================
   INFO CARD
===================================================== */

const InfoCard = styled.div`
  padding: 16px;

  background: white;

  border: 1px solid var(--color-border);

  border-radius: 8px;
`;

const InfoCardTitle = styled.h3`
  margin: 0 0 14px;

  font-size: 13px;
  font-weight: 600;

  color: var(--color-text);
`;

const InfoGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;
`;

const InfoIcon = styled.div`
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  background: var(--color-bg);

  color: var(--color-text-muted);
`;

const InfoLabel = styled.div`
  font-size: 12px;

  color: var(--color-text-muted);
`;

const InfoValue = styled.div`
  margin-top: 2px;

  font-size: 14px;

  color: var(--color-text);
`;

/* =====================================================
   VESSEL
===================================================== */

const VesselCard = styled.div`
  margin-top: 14px;

  padding: 14px;

  display: flex;
  align-items: center;
  gap: 12px;

  background: var(--color-bg);

  border: 1px solid var(--color-border);

  border-radius: 8px;
`;

const VesselIcon = styled.div`
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 7px;

  background: var(--color-white);

  color: var(--color-accent);
`;

const VesselLabel = styled.div`
  font-size: 12px;

  color: var(--color-text-muted);
`;

const VesselName = styled.div`
  margin-top: 2px;

  font-size: 14px;
  font-weight: 600;

  color: var(--color-text);
`;

const VesselId = styled.div`
  margin-top: 2px;

  font-size: 10px;

  color: var(--color-text-muted);
`;

const ViewVesselButton = styled.button`
  margin-left: auto;

  padding: 7px 11px;

  border: 1px solid var(--color-border);

  border-radius: 6px;

  background: var(--color-white);

  color: var(--color-accent);

  font-size: 12px;

  cursor: pointer;

  &:hover {
    background: var(--color-accent);
    color: var(--color-white);
  }
`;

/* =====================================================
   MESSAGE
===================================================== */

const MessageSection = styled.section`
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px;

  font-size: 13px;
  font-weight: 600;

  color: var(--color-text);
`;

const MessageCard = styled.div`
  padding: 18px;

  background: var(--color-white);

  border: 1px solid var(--color-border);

  border-radius: 8px;
`;

const MessageHeader = styled.div`
  display: flex;

  justify-content: space-between;

  padding-bottom: 12px;

  border-bottom: 1px solid var(--color-border);
`;

const MessageAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;

  color: var(--color-text);
`;

const MessageSubject = styled.div`
  margin-top: 3px;

  font-size: 14px;

  color: var(--color-text-muted);
`;

const MessageDate = styled.div`
  font-size: 10px;

  color: var(--color-text-muted);
`;

const MessageText = styled.div`
  padding-top: 15px;

  font-size: 13px;

  line-height: 1.7;

  color: var(--color-text);
`;

/* =====================================================
   REPLY
===================================================== */

const ReplyArea = styled.div`
  padding: 14px 18px;

  border-top: 1px solid var(--color-border);

  background: var(--color-white);
`;

const ReplyForm = styled.form``;

const ReplyInput = styled.textarea`
  width: 100%;

  min-height: 60px;

  padding: 10px 12px;

  box-sizing: border-box;

  resize: vertical;

  border: 1px solid var(--color-border);

  border-radius: 7px;

  outline: none;

  font-family: inherit;

  font-size: 13px;

  &:focus {
    border-color: var(--color-accent);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const ReplyFooter = styled.div`
  margin-top: 8px;

  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const ReplyHint = styled.div`
  font-size: 11px;

  color: var(--color-text-muted);

  strong {
    color: var(--color-text);
  }
`;

const SendButton = styled.button`
  height: 34px;

  padding: 0 13px;

  display: flex;
  align-items: center;

  gap: 6px;

  border: none;

  border-radius: 6px;

  background: var(--color-accent);

  color: var(--color-white);

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: var(--color-accent);
  }
`;

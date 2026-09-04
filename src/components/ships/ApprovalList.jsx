import React, { useState } from "react";
import styled from "styled-components";
import { usePendingShips } from "../../hooks/ships/usePendingShips.js";
import Spinner from "../Spinner.jsx";
import BackBtn from "../BackBtn.jsx";

const ApprovalList = () => {
  const { data, isLoading } = usePendingShips();

  if (isLoading) return <Spinner />;

  const vessels = data.data;

  const onApprove = () => {
    console.log("Approve");
  };

  const onReject = () => {
    console.log("Reject");
  };

  return (
    <Container>
      <Header>
        <div>
          <BackBtn />
          <Title>Vessel Approvals</Title>
          <Subtitle>Review submitted vessels before they go live on the website.</Subtitle>
        </div>

        <PendingBadge>{vessels.length} Pending</PendingBadge>
      </Header>

      <List>
        {vessels.length === 0 ? (
          <EmptyState>
            <EmptyIcon>✓</EmptyIcon>
            <EmptyTitle>All caught up</EmptyTitle>
            <EmptyText>There are no vessels waiting for approval.</EmptyText>
          </EmptyState>
        ) : (
          vessels.map((vessel) => <ApprovalCard key={vessel.id} vessel={vessel} onApprove={onApprove} onReject={onReject} />)
        )}
      </List>
    </Container>
  );
};

const ApprovalCard = ({ vessel, onApprove, onReject }) => {
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (!reason.trim()) return;

    onReject?.(vessel.id, reason.trim());

    setReason("");
    setShowReject(false);
  };

  return (
    <Card>
      <CardTop>
        <VesselInfo>
          <ImageWrapper>
            {vessel.mainImage ? (
              <VesselImage src={vessel.mainImage} alt={vessel.mainImageAlt || vessel.shipName} />
            ) : (
              <ImagePlaceholder>⚓</ImagePlaceholder>
            )}
          </ImageWrapper>

          <Info>
            <VesselName>{vessel.shipName}</VesselName>

            <Meta>
              <MetaItem>
                IMO <strong>{vessel.imo}</strong>
              </MetaItem>

              {vessel.location && <MetaItem>{vessel.location}</MetaItem>}

              {vessel.buildYear && <MetaItem>Built {vessel.buildYear}</MetaItem>}
            </Meta>

            <Submitted>
              Submitted by <strong>{vessel.listedBy?.name || "Unknown user"}</strong>
            </Submitted>
          </Info>
        </VesselInfo>

        <Status>PENDING REVIEW</Status>
      </CardTop>

      <Divider />

      {!showReject ? (
        <Actions>
          <RejectButton onClick={() => setShowReject(true)}>Reject</RejectButton>

          <ApproveButton onClick={() => onApprove?.(vessel.id)}>
            <CheckIcon>✓</CheckIcon>
            Approve
          </ApproveButton>
        </Actions>
      ) : (
        <RejectSection>
          <RejectTitle>Why are you rejecting this vessel?</RejectTitle>

          <RejectTextarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='Explain what needs to be corrected before this vessel can be approved...'
            rows={4}
            autoFocus
          />

          <RejectActions>
            <CancelButton
              onClick={() => {
                setShowReject(false);
                setReason("");
              }}
            >
              Cancel
            </CancelButton>

            <ConfirmRejectButton disabled={!reason.trim()} onClick={handleReject}>
              Confirm Rejection
            </ConfirmRejectButton>
          </RejectActions>
        </RejectSection>
      )}
    </Card>
  );
};

export default ApprovalList;

/* =========================
   Container
========================= */

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

/* =========================
   Header
========================= */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
`;

const Subtitle = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--color-text-muted);
`;

const PendingBadge = styled.span`
  padding: 7px 12px;
  border-radius: 999px;

  background: var(--color-warning);
  color: var(--color-danger);

  font-size: 13px;
  font-weight: 600;
`;

/* =========================
   List
========================= */

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

/* =========================
   Card
========================= */

const Card = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  overflow: hidden;

  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: var(--color-border);
    box-shadow: var(--shadow-md);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding: 20px;
`;

const VesselInfo = styled.div`
  display: flex;
  gap: 16px;
  min-width: 0;
`;

const ImageWrapper = styled.div`
  width: 76px;
  height: 60px;
  flex-shrink: 0;

  overflow: hidden;
  border-radius: 9px;
  background: var(--color-grey-200);
`;

const VesselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-grey-200);
  font-size: 24px;
`;

const Info = styled.div`
  min-width: 0;
`;

const VesselName = styled.h3`
  margin: 0 0 7px;

  font-size: 17px;
  font-weight: 650;
  color: var(--color-text);
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  font-size: 13px;
  color: var(--color-text-muted);
`;

const MetaItem = styled.span`
  &:not(:last-child)::after {
    content: "•";
    margin-left: 8px;
    color: var(--color-text-muted);
  }

  strong {
    color: var(--color-text);
    font-weight: 600;
  }
`;

const Submitted = styled.p`
  margin: 9px 0 0;

  font-size: 12px;
  color: var(--color-text-muted);

  strong {
    color: var(--color-text);
    font-weight: 500;
  }
`;

const Status = styled.span`
  flex-shrink: 0;

  padding: 6px 10px;
  border-radius: 6px;

  background: var(--color-warning);
  color: var(--color-danger);

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

/* =========================
   Divider
========================= */

const Divider = styled.div`
  height: 1px;
  background: var(--color-border);
`;

/* =========================
   Actions
========================= */

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  padding: 14px 20px;
`;

const ApproveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 9px 15px;

  border: none;
  border-radius: 8px;

  background: var(--color-success-600);
  color: var(--color-white);

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover {
    background: var(--color-success);
  }
`;

const RejectButton = styled.button`
  padding: 9px 15px;

  border: 1px solid var(--color-border);
  border-radius: 8px;

  background: var(--color-white);
  color: var(--color-success-600);

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: var(--color-success-600);
    color: var(--color-white);
    border-color: var(--color-success-600);
  }
`;

const CheckIcon = styled.span`
  font-size: 15px;
`;

/* =========================
   Rejection
========================= */

const RejectSection = styled.div`
  padding: 18px 20px 20px;

  background: var(--color-grey-200);
`;

const RejectTitle = styled.h4`
  margin: 0 0 10px;

  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`;

const RejectTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;

  padding: 11px 12px;

  border: 1px solid var(--color-border);
  border-radius: 8px;

  background: var(--color-white);

  font-family: inherit;
  font-size: 13px;
  color: var(--color-text);

  resize: vertical;
  outline: none;

  &::placeholder {
    color: var(--color-text);
  }

  &:focus {
    border-color: var(--color-border);
    box-shadow: var(--shadow-md);
  }
`;

const RejectActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 8px 14px;

  border: 1px solid var(--color-border);
  border-radius: 8px;

  background: var(--color-white);
  color: var(--color-text);

  font-size: 13px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background: var(--color-grey-200);
  }
`;

const ConfirmRejectButton = styled.button`
  padding: 8px 14px;

  border: none;
  border-radius: 8px;

  background: var(--color-danger);
  color: white;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--color-danger-200);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

/* =========================
   Empty State
========================= */

const EmptyState = styled.div`
  padding: 70px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  border: 1px dashed var(--color-border);
  border-radius: 14px;
`;

const EmptyIcon = styled.div`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 12px;

  border-radius: 50%;
  background: var(--color-success-200);
  color: var(--color-success);

  font-size: 20px;
  font-weight: 700;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 5px;

  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
`;

const EmptyText = styled.p`
  margin: 0;

  font-size: 14px;
  color: var(--color-text-muted);
`;

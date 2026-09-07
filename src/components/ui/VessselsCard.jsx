import styled from "styled-components";

const VesselsCard = ({ vessel }) => {
  console.log(vessel);

  return (
    <VesselCard key={vessel.id}>
      <ImageWrapper>
        <VesselImage src={vessel.mainImage} alt={vessel.mainImageAlt} />

        <StatusBadge $status={vessel.listingStatus}>
          <StatusDot $status={vessel.listingStatus} />

          {vessel.status === "VERIFIED" ? "Verified" : vessel.listingStatus === "PENDING" ? "PENDING REVIEW" : "REJECTED"}
        </StatusBadge>

        {vessel.status === "VERIFIED" && <LiveLabel>● Verified</LiveLabel>}
      </ImageWrapper>

      <CardContent>
        <CardHeader>
          <div>
            <VesselName>{vessel.shipName}</VesselName>

            <VesselType>{vessel.type}</VesselType>
          </div>

          <MoreButton>•••</MoreButton>
        </CardHeader>

        <Details>
          <div>
            <DetailLabel>IMO</DetailLabel>
            <DetailValue>{vessel.imo}</DetailValue>
          </div>

          <div>
            <DetailLabel>Built</DetailLabel>
            <DetailValue>{vessel.buildYear}</DetailValue>
          </div>
        </Details>

        <Location>
          <LocationIcon>⌖</LocationIcon>
          {vessel.location}
        </Location>

        <PriceRow>
          <div>
            <PriceLabel>Asking price</PriceLabel>
            <Price>{vessel.price}</Price>
          </div>

          {vessel.listingStatus === "VERIFIED" && (
            <Views>
              <ViewsIcon>◉</ViewsIcon>
              Verified
            </Views>
          )}
        </PriceRow>

        <Actions>
          <SecondaryButton onClick={() => console.log("View vessel", vessel.id)}>View Details</SecondaryButton>

          {vessel.status === "VERIFIED" && <IconButton title='Share'>↗</IconButton>}

          {vessel.status === "PENDING" && <SecondaryButton onClick={() => console.log("Edit vessel", vessel.id)}>Edit</SecondaryButton>}
        </Actions>
      </CardContent>
    </VesselCard>
  );
};

export default VesselsCard;

/* ---------- Cards ---------- */

const VesselCard = styled.article`
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 205px;
  overflow: hidden;
  background: var(--color-grey-200);
`;

const VesselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 7px;
  background: var(--color-white);
  color: ${({ $status }) =>
    $status === "APPROVED" ? "var(--color-success-600)" : $status === "PENDING" ? "var(--color-warning-600)" : "var(--color-danger-600)"};
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.04em;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $status }) =>
    $status === "APPROVED" ? "var(--color-success-600)" : $status === "PENDING" ? "var(--color-warning-600)" : "var(--color-danger-600)"};
`;

const LiveLabel = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 5px 8px;
  border-radius: 6px;
  background: var(--color-text);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 18px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const VesselName = styled.h3`
  margin: 0;
  color: var(--color-text);
  font-size: 18px;
  font-weight: 700;
`;

const VesselType = styled.div`
  margin-top: 4px;
  color: var(--color-text-muted);
  font-size: 12px;
`;

const MoreButton = styled.button`
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  letter-spacing: 2px;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 17px;
`;

const DetailLabel = styled.div`
  margin-bottom: 3px;
  color: var(--color-text-muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailValue = styled.div`
  color: var(--color-text);
  font-size: 12px;
  font-weight: 600;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 15px;
  color: var(--color-text-muted);
  font-size: 14px;
`;

const LocationIcon = styled.span`
  color: var(--color-text-muted);
`;

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 19px;
`;

const PriceLabel = styled.div`
  margin-bottom: 4px;
  color: var(--color-text-muted);
  font-size: 10px;
`;

const Price = styled.div`
  color: var(--color-text);
  font-size: 16px;
  font-weight: 700;
`;

const Views = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-success-600);
  font-size: 12px;
  font-weight: 600;
`;

const ViewsIcon = styled.span`
  font-size: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
`;

const SecondaryButton = styled.button`
  flex: 1;
  height: 36px;
  border-radius: 8px;
  background: var(--color-accent);
  border: none;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: var(--color-accent-600);
  }
`;

const IconButton = styled.button`
  width: 38px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    background: var(--color-border);
  }
`;

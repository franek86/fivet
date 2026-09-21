import { useParams } from "react-router";
import styled from "styled-components";
import { useShip } from "../../hooks/ships/useShip.js";

import Spinner from "../Spinner.jsx";
import { formatedPrice } from "../../utils/formattedPrice.js";
import { customFormatDate } from "../../utils/formatDate.js";

// Styled Components
const PageWrapper = styled.div`
  max-width: 100%;
  margin: 4rem auto;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 1fr);
  min-height: 360px;
  overflow: hidden;

  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 20px;

  box-shadow: var(--shadow-md);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 360px;

  object-fit: cover;
  display: block;

  @media (max-width: 900px) {
    height: 300px;
    min-height: 300px;
  }

  @media (max-width: 600px) {
    height: 240px;
    min-height: 240px;
  }
`;

const ShipInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 36px;

  @media (max-width: 600px) {
    padding: 24px 20px;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: var(--color-text);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const SubTitle = styled.p`
  margin: 12px 0 0;
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 1.5;
`;

const Price = styled.div`
  margin-top: 32px;
  color: var(--color-text);
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const Section = styled.div`
  margin-top: 32px;

  padding: 28px;

  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 16px;

  @media (max-width: 600px) {
    margin-top: 20px;
    padding: 20px 16px;
    border-radius: 14px;
  }
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  width: fit-content;

  padding: 6px 10px;
  margin-bottom: 18px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
  line-height: 1;

  color: ${({ published }) => (published ? "var(--color-success-600)" : "var(--color-white)")};

  background: ${({ published }) => (published ? "var(--color-success)" : "var(--color-text)")};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;

    background: currentColor;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 24px;
  color: var(--color-text);
  font-size: 19px;
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  border-top: 1px solid var(--color-border);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoLabel = styled.div`
  margin-bottom: 6px;
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 500;
`;

export const InfoValue = styled.div`
  overflow: hidden;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;

  text-overflow: ellipsis;
`;

export const InfoItem = styled.div`
  min-width: 0;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
  &:not(:nth-child(3n + 1)) {
    border-left: 1px solid var(--color-border);
  }
  @media (max-width: 900px) {
    &:not(:nth-child(3n + 1)) {
      border-left: none;
    }
    &:nth-child(even) {
      border-left: 1px solid var(--color-border);
    }
  }
  @media (max-width: 600px) {
    padding: 14px 0;
    &:nth-child(even) {
      border-left: none;
    }
  }
`;

const Description = styled.p`
  max-width: 900px;
  margin: 0;
  color: var(--color-text);
  font-size: 15px;
  line-height: 1.75;
  white-space: pre-line;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;

  display: block;

  object-fit: cover;

  border-radius: 10px;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.015);
  }
`;

function SingleShipData() {
  const { id } = useParams();
  const { data, isLoading, isError } = useShip(id);

  if (isError) return <>Error</>;
  if (isLoading) return <Spinner />;

  const {
    shipName,
    imo,
    isPublished,
    price,
    currency,
    flag,
    buildYear,
    buildCountry,

    mainEngine,
    enginePower,

    lengthOverall,
    beam,
    dwt,
    draft,
    netTonnage,
    grossTonnage,

    cargoCapacity,
    fuelType,
    cruisingSpeed,

    classNotation,
    ssDueDate,
    ddDueDate,
    currentPort,
    nextPort,

    description,
    mainImage,
    images,
    shipType: { name },
  } = data;

  return (
    <PageWrapper>
      {/* Header */}
      <Header>
        <MainImage src={mainImage} alt={shipName} />
        <ShipInfo>
          <div>
            <Status published={isPublished}>{isPublished ? "Published" : "Unpublished"}</Status>
            <Title>{shipName}</Title>

            <SubTitle>
              IMO: {imo} • {name}
            </SubTitle>
          </div>
          <Price>{formatedPrice(price, currency)}</Price>
        </ShipInfo>
      </Header>

      {/* Vessel overview */}
      <Section>
        <SectionTitle>Vessel overview</SectionTitle>

        <InfoGrid>
          {name && (
            <InfoItem>
              <InfoLabel>Vessel Type:</InfoLabel>
              <InfoValue>{name}</InfoValue>
            </InfoItem>
          )}

          {flag && (
            <InfoItem>
              <InfoLabel>Flag:</InfoLabel>
              <InfoValue>{flag}</InfoValue>
            </InfoItem>
          )}

          {buildYear > 0 && (
            <InfoItem>
              <InfoLabel>Build Year:</InfoLabel>
              <InfoValue>{buildYear}</InfoValue>
            </InfoItem>
          )}

          {buildCountry && (
            <InfoItem>
              <InfoLabel>Build Country:</InfoLabel>
              <InfoValue>{buildCountry}</InfoValue>
            </InfoItem>
          )}

          {imo > 0 && (
            <InfoItem>
              <InfoLabel>IMO Number:</InfoLabel>
              <InfoValue>{imo}</InfoValue>
            </InfoItem>
          )}
        </InfoGrid>
      </Section>

      {/* Dimension and capacity */}
      <Section>
        <SectionTitle>Dimension & Capacity</SectionTitle>

        <InfoGrid>
          {lengthOverall > 0 && (
            <InfoItem>
              <InfoLabel>LOA:</InfoLabel>
              <InfoValue>{lengthOverall} m</InfoValue>
            </InfoItem>
          )}

          {beam > 0 && (
            <InfoItem>
              <InfoLabel>Beam:</InfoLabel>
              <InfoValue>{beam} m</InfoValue>
            </InfoItem>
          )}

          {draft > 0 && (
            <InfoItem>
              <InfoLabel>Draft:</InfoLabel>
              <InfoValue>{draft} m</InfoValue>
            </InfoItem>
          )}

          {dwt > 0 && (
            <InfoItem>
              <InfoLabel>Deadweight (DWT):</InfoLabel>
              <InfoValue>{dwt} MT</InfoValue>
            </InfoItem>
          )}

          {grossTonnage > 0 && (
            <InfoItem>
              <InfoLabel>Gross Tonnage:</InfoLabel>
              <InfoValue>{grossTonnage} GT</InfoValue>
            </InfoItem>
          )}

          {netTonnage > 0 && (
            <InfoItem>
              <InfoLabel>Net Tonnage:</InfoLabel>
              <InfoValue>{netTonnage} NT</InfoValue>
            </InfoItem>
          )}

          {cargoCapacity > 0 && (
            <InfoItem>
              <InfoLabel>Cargo Capacity:</InfoLabel>
              <InfoValue>{cargoCapacity}</InfoValue>
            </InfoItem>
          )}
        </InfoGrid>
      </Section>

      {/* Machinery */}
      {(mainEngine || enginePower || fuelType || cruisingSpeed) && (
        <Section>
          <SectionTitle>Machinery & Performance</SectionTitle>
          <InfoGrid>
            {mainEngine && (
              <InfoItem>
                <InfoLabel>Main Engine:</InfoLabel>
                <InfoValue>{mainEngine}</InfoValue>
              </InfoItem>
            )}

            {enginePower && (
              <InfoItem>
                <InfoLabel>Engine Power:</InfoLabel>
                <InfoValue>{enginePower} kW</InfoValue>
              </InfoItem>
            )}

            {fuelType && (
              <InfoItem>
                <InfoLabel>Fuel Type:</InfoLabel>
                <InfoValue>{fuelType} kW</InfoValue>
              </InfoItem>
            )}

            {cruisingSpeed > 0 && (
              <InfoItem>
                <InfoLabel>Cruising Speed:</InfoLabel>
                <InfoValue>{cruisingSpeed} knots</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>
      )}

      {/* Classification */}
      {(classNotation || ssDueDate || ddDueDate) && (
        <Section>
          <SectionTitle>Classification & Surveys</SectionTitle>
          <InfoGrid>
            {classNotation && (
              <InfoItem>
                <InfoLabel>Class:</InfoLabel>
                <InfoValue>{classNotation}</InfoValue>
              </InfoItem>
            )}

            {ssDueDate && (
              <InfoItem>
                <InfoLabel>SS Due Date:</InfoLabel>
                <InfoValue>{customFormatDate(ssDueDate)}</InfoValue>
              </InfoItem>
            )}

            {ddDueDate && (
              <InfoItem>
                <InfoLabel>DD Due Date:</InfoLabel>
                <InfoValue>{customFormatDate(ddDueDate)}</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>
      )}

      {/* Itinerary */}
      {(currentPort || nextPort) && (
        <Section>
          <SectionTitle>Itinerary</SectionTitle>
          <InfoGrid>
            {currentPort && (
              <InfoItem>
                <InfoLabel>Current Port:</InfoLabel>
                <InfoValue>{currentPort}</InfoValue>
              </InfoItem>
            )}
            {nextPort && (
              <InfoItem>
                <InfoLabel>Next Port:</InfoLabel>
                <InfoValue>{nextPort}</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>
      )}

      {/* Description */}
      {description && (
        <Section>
          <SectionTitle>Description</SectionTitle>

          <Description>{description}</Description>
        </Section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <Section>
          <SectionTitle>Gallery</SectionTitle>
          <Gallery>
            {images.map((img, index) => (
              <GalleryImage key={index} src={img.url} alt={img.alt} />
            ))}
          </Gallery>
        </Section>
      )}
    </PageWrapper>
  );
}

export default SingleShipData;

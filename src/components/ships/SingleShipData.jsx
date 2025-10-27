import { useParams } from "react-router";
import styled from "styled-components";
import { useShip } from "../../hooks/ships/useShip.js";

import Spinner from "../Spinner.jsx";

// Styled Components
const PageWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: #f9fafb;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const MainImage = styled.img`
  width: 300px;
  height: 200px;
  border-radius: var(--border-radius-md);
  object-fit: cover;
`;

const ShipInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubTitle = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-900);
`;

const Price = styled.div`
  margin-top: 1.2rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-green-700);
`;

const Section = styled.div`
  background: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  margin-top: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Status = styled.span`
  padding: 6px 12px;
  border-radius: var(--border-radius-md);
  font-size: 1.35rem;
  font-weight: bold;
  color: var(--color-grey-0);
  background: ${(props) => (props.published ? "#15803d" : "#b91c1c")};
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  font-size: 1.35rem;
  color: #374151;

  span {
    font-weight: bold;
    color: #111827;
  }
`;

const Description = styled.p`
  font-size: 1.35rem;
  color: #374151;
  line-height: 1.5;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  overflow-x: auto;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 120px;
  border-radius: var(--border-radius-md);
  object-fit: cover;
  flex-shrink: 0;
`;

function SingleShipData() {
  const { id } = useParams();
  const { data, isLoading, isError } = useShip(id);

  if (isError) return <>Error</>;
  if (isLoading) return <Spinner />;

  const {
    shipName,
    mainImage,
    imo,
    isPublished,
    price,
    location,
    mainEngine,
    lengthOverall,
    length,
    beam,
    depth,
    draft,
    tonnage,
    cargoCapacity,
    buildYear,
    refitYear,
    buildCountry,
    remarks,
    description,
    images,
    shipType: { name },
  } = data;

  return (
    <PageWrapper>
      <Header>
        <MainImage src={mainImage} alt={shipName} />
        <ShipInfo>
          <div>
            <Status published={isPublished}>{isPublished ? "Published" : "Unpublished"}</Status>
            <TitleRow>
              <Title>{shipName}</Title>
            </TitleRow>
            <SubTitle>
              IMO: {imo} • {name}
            </SubTitle>
            <Price>${price.toLocaleString()} USD</Price>
          </div>
          <div>Location: {location}</div>
        </ShipInfo>
      </Header>

      <Section>
        <SectionTitle>Specifications</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <span>Main Engine:</span> {mainEngine}
          </InfoItem>
          <InfoItem>
            <span>Length Overall:</span> {lengthOverall}
          </InfoItem>
          <InfoItem>
            <span>Length:</span> {length}
          </InfoItem>
          <InfoItem>
            <span>Beam:</span> {beam}
          </InfoItem>
          <InfoItem>
            <span>Depth:</span> {depth}
          </InfoItem>
          <InfoItem>
            <span>Draft:</span> {draft}
          </InfoItem>
          <InfoItem>
            <span>Tonnage:</span> {tonnage}
          </InfoItem>

          <InfoItem>
            <span>Cargo Capacity:</span> {cargoCapacity}
          </InfoItem>

          {buildYear && (
            <InfoItem>
              <span>Build Year:</span> {buildYear}
            </InfoItem>
          )}

          {refitYear && (
            <InfoItem>
              <span>Refit Year:</span> {refitYear}
            </InfoItem>
          )}

          {buildCountry && (
            <InfoItem>
              <span>Build Country:</span> {buildCountry}
            </InfoItem>
          )}
        </InfoGrid>
      </Section>

      {remarks && (
        <Section>
          <SectionTitle>Remarks</SectionTitle>
          <Description>{remarks}</Description>
        </Section>
      )}

      {description && (
        <Section>
          <SectionTitle>Description</SectionTitle>
          <Description>{description}</Description>
        </Section>
      )}
      {images.length > 0 && (
        <Section>
          <SectionTitle>Gallery</SectionTitle>
          <Gallery>
            {images.map((img, index) => (
              <GalleryImage key={index} src={img} alt={`Ship-${index}`} />
            ))}
          </Gallery>
        </Section>
      )}
    </PageWrapper>
  );
}

export default SingleShipData;

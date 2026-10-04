import styled from "styled-components";
import SearchVerifiedBrokers from "./SearchVerifiedBrokers.jsx";

const VerifiedBrokersHeader = () => {
  return (
    <Header>
      <div>
        <Title>Verified Brokers</Title>
        <Subtitle>Connect with verified brokers to help sell or manage your vessel.</Subtitle>
      </div>

      <SearchVerifiedBrokers />
    </Header>
  );
};

export default VerifiedBrokersHeader;

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

import styled from "styled-components";
import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";
import Spinner from "../Spinner.jsx";

import { FaRegEye } from "react-icons/fa";
import { formatedPrice } from "../../utils/formattedPrice.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
  padding: 2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(5, 1fr);
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  font-size: 1.5rem;

  &:nth-child(odd) {
    background-color: var(--color-brand-100);
  }
  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

const WrapperTop = styled(Wrapper)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
`;

const Views = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function TopShips() {
  const { data, isFetching, isError } = useDashboardStatistic();

  if (isFetching) return <Spinner />;
  if (isError) return <div>Error</div>;
  const { topShips } = data;
  return (
    <Container>
      <h3>Popular ships</h3>
      <WrapperTop>
        <p>Image</p>
        <p>Name</p>
        <p>IMO</p>
        <p>Price</p>
        <p>Views</p>
      </WrapperTop>
      {topShips.map((ship) => (
        <Wrapper>
          <Image src={ship.mainImage} alt={ship.shipName} />
          <p>{ship.shipName}</p>
          <p>{ship.imo}</p>
          <p>{formatedPrice(ship.price)}</p>
          <Views>
            <FaRegEye />
            {ship.clicks}
          </Views>
        </Wrapper>
      ))}
    </Container>
  );
}

export default TopShips;

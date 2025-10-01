import { Link } from "react-router";
import styled from "styled-components";
import { useDashboardStatistic } from "../../hooks/useDashboardStatistic.js";

import { FaRegEye } from "react-icons/fa";
import { formatedPrice } from "../../utils/formattedPrice.js";

const Container = styled.section`
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
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  font-size: 1.5rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: 60px repeat(5, 1fr);
  }

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
  display: none;
  width: 4rem;
  height: 4rem;

  @media screen and (min-width: 640px) {
    display: block;
  }
`;

const Views = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function TopShips() {
  const { data, isError } = useDashboardStatistic();

  if (isError) return <div>Error</div>;

  return (
    <Container>
      <h3>Popular ships</h3>
      <WrapperTop>
        <p className='hidden-table-sm'>Image</p>
        <p>Name</p>
        <p>IMO</p>
        <p>Price</p>
        <p>Views</p>
      </WrapperTop>
      {data?.topShips?.map((ship) => (
        <Wrapper key={ship.id}>
          <Image src={ship.mainImage} alt={ship.shipName} />
          <p>{ship.shipName}</p>
          <p>{ship.imo}</p>
          <p>{formatedPrice(ship.price)}</p>
          <Views to={`/ships/${ship.id}`}>
            <FaRegEye />
            {ship.clicks}
          </Views>
        </Wrapper>
      ))}
    </Container>
  );
}

export default TopShips;

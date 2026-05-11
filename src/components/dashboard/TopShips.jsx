/**
 * React & Hooks
 */
import { Link } from "react-router";

/**
 * Third-party libraries
 */
import styled from "styled-components";
import { Eye, Ship } from "lucide-react";

/**
 * Features
 */
import { formatedPrice } from "../../utils/formattedPrice.js";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  gap: 12px;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: 0;
  }

  .thumb {
    display: none;
    width: 44px;
    height: 44px;
    border-radius: var(--border-radius-lg);

    @media screen and (min-width: 640px) {
      display: block;
    }
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .imo {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: end;
    font-size: 13px;
  }
`;

const ImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-accent);
`;

const Views = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

function TopShips({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={6} />;
  }

  return (
    <Container className='card-container'>
      <div className='card-header'>
        <h3>Popular ships</h3>
      </div>

      {data?.topShips?.map((ship) => (
        <ListRow key={ship.id}>
          {ship.mainImage ? (
            <img className='thumb' src={ship.mainImage} alt={ship.shipName} />
          ) : (
            <ImagePlaceholder>
              <Ship />
            </ImagePlaceholder>
          )}
          <div className='body'>
            <div className='name'>{ship.shipName}</div>
            <div className='price'>{formatedPrice(ship.price)}</div>
          </div>

          <div className='right'>
            <div className='imo'>IMO: {ship.imo}</div>
            <Views to={`/ships/${ship.id}`}>
              <Eye size={16} />
              {ship.clicks}
            </Views>
          </div>
        </ListRow>
      ))}
    </Container>
  );
}

export default TopShips;

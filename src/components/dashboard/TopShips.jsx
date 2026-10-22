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

import {
  ListContainer,
  ListLink,
  ImagePlaceholder,
  ListRow,
  ListThumbnail,
  ListLeftContent,
  ListRightContent,
  ListTitle,
  ListViews,
  ListHeaderTitle,
} from "../ui/DashboardUI.jsx";

function TopShips({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={6} />;
  }

  return (
    <ListContainer>
      <ListHeaderTitle>Popular ships</ListHeaderTitle>

      {data?.map((ship) => (
        <ListLink key={ship.id} to={`/admin/vessels/${ship.id}`}>
          <ListRow>
            {ship.mainImage ? (
              <ListThumbnail src={ship.mainImage} alt={ship.shipName} />
            ) : (
              <ImagePlaceholder>
                <Ship />
              </ImagePlaceholder>
            )}
            <ListLeftContent>
              <ListTitle>{ship.shipName}</ListTitle>
              <div className='price'>{formatedPrice(ship.price)}</div>
            </ListLeftContent>

            <ListRightContent>
              <Imo>IMO: {ship.imo}</Imo>
              <ListViews>
                <Eye size={16} />
                {ship.clicks}
              </ListViews>
            </ListRightContent>
          </ListRow>
        </ListLink>
      ))}
    </ListContainer>
  );
}

export default TopShips;

const Imo = styled.span`
  font-size: 1.2rem;
  color: var(--color-text-muted);
`;

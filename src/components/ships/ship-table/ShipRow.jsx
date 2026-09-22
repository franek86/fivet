import { formatedPrice } from "../../../utils/formattedPrice.js";
import styled from "styled-components";
import { MoreHorizontal } from "lucide-react";

import Checkbox from "../../ui/Checkbox.jsx";
import ToggleSwitch from "../../ui/ToggleSwitch.jsx";

const ShipRow = ({ ship, selected, onSelect, user, isPublish, onHandleIsPublish }) => {
  const handleSelect = () => {
    onSelect(ship.id);
  };

  return (
    <Row>
      <Checkbox checked={selected} onChange={handleSelect} />

      {/* Vessel */}
      <VesselCell>
        <VesselImageWrapper>
          <VesselImage src={ship.mainImage} alt={ship.shipName} />
        </VesselImageWrapper>

        <VesselInfo>
          <VesselName>{ship.shipName}</VesselName>

          <VesselMeta>{ship.flag || "No flag"}</VesselMeta>
        </VesselInfo>
      </VesselCell>

      {/* Publish switch button */}
      {user?.role === "ADMIN" && (
        <Cell>
          <ToggleSwitch checked={isPublish} onChange={onHandleIsPublish} />
        </Cell>
      )}

      {/* IMO */}
      <Cell>
        <Value>{ship.imo || "—"}</Value>
      </Cell>

      {/* Ship type */}
      <Cell>
        <Value>{ship.shipType?.name || "—"}</Value>
      </Cell>

      {/* Price */}
      <Cell>
        <Price>{formatedPrice(ship.price, ship.currency)}</Price>
      </Cell>

      {/* Status */}
      <Cell>
        <Status $published={ship.isPublished}>
          <StatusDot $published={ship.isPublished} />

          {ship.isPublished ? "Published" : "Draft"}
        </Status>
      </Cell>

      {/* Actions */}
      <Actions>
        <ActionButton type='button' aria-label={`Actions for ${ship.shipName}`}>
          <MoreHorizontal size={18} />
        </ActionButton>
      </Actions>
    </Row>
  );
};

export default ShipRow;

const Row = styled.div`
  display: grid;

  grid-template-columns:
    4rem
    minmax(24rem, 2fr)
    12rem
    12rem
    14rem
    16rem
    12rem
    5rem;

  align-items: center;

  min-height: 7.5rem;
  padding: 1rem 1.5rem;

  border-bottom: 1px solid var(--color-border);

  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-bg);
  }

  @media (max-width: 1100px) {
    grid-template-columns:
      4rem
      minmax(22rem, 2fr)
      11rem
      11rem
      13rem
      15rem
      11rem
      5rem;
  }

  @media (max-width: 850px) {
    grid-template-columns:
      4rem
      minmax(20rem, 2fr)
      11rem
      11rem
      13rem
      15rem
      5rem;
  }
`;

const VesselCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 0;
`;

const VesselImageWrapper = styled.div`
  flex-shrink: 0;

  width: 5.2rem;
  height: 5.2rem;

  overflow: hidden;

  border-radius: var(--border-radius-sm);
  background: var(--color-grey-200);
`;

const VesselImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const VesselInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 0;
`;

const VesselName = styled.span`
  overflow: hidden;

  font-size: 1.35rem;
  font-weight: 600;

  color: var(--color-text);

  text-overflow: ellipsis;
  white-space: nowrap;
`;

const VesselMeta = styled.span`
  font-size: 1.15rem;
  color: var(--color-text);
`;

const Cell = styled.div`
  min-width: 0;
`;

const Value = styled.span`
  font-size: 1.25rem;
  color: var(--color-text);
`;

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text);
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  width: fit-content;

  padding: 0.45rem 0.8rem;

  border-radius: 999px;

  background: ${({ $published }) => ($published ? "var(--color-success-200)" : "var(--color-grey-200)")};

  color: ${({ $published }) => ($published ? "var(--color-success-600)" : "var(--color-text)")};

  font-size: 1.1rem;
  font-weight: 600;
`;

const StatusDot = styled.span`
  width: 0.65rem;
  height: 0.65rem;

  border-radius: 50%;

  background: ${({ $published }) => ($published ? "var(--color-success-600)" : "var(--color-text)")};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.5rem;
  height: 3.5rem;

  border: none;
  border-radius: 50%;

  background: transparent;
  color: var(--color-text);

  cursor: pointer;

  &:hover {
    background: var(--color-grey-200);
    color: var(--color-text);
  }
`;

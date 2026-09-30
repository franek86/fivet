import React from "react";
import styled from "styled-components";

const ShipSelectedFilters = ({ filters }) => {
  const selectedFilterCount =
    filters.shipType.length +
    (filters.minPrice !== undefined ? 1 : 0) +
    (filters.maxPrice !== undefined ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <SelectedFilterWrap>
      <strong>Filters ({selectedFilterCount})</strong>
    </SelectedFilterWrap>
  );
};

export default ShipSelectedFilters;

const SelectedFilterWrap = styled.div`
  margin: 4rem 0 1.5rem 0;
`;

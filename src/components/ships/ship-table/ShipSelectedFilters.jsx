import React from "react";

const ShipSelectedFilters = ({ filters }) => {
  const selectedFilterCount =
    filters.shipType.length +
    (filters.minPrice !== undefined ? 1 : 0) +
    (filters.maxPrice !== undefined ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div>
      <strong>Filters ({selectedFilterCount})</strong>
    </div>
  );
};

export default ShipSelectedFilters;

import styled from "styled-components";
import Sort from "../../ui/Sort.jsx";
import { SlidersHorizontal, Trash2 } from "lucide-react";
import { SORT_VESSEL } from "../../../constants/index.js";
import Button from "../../ui/Button.jsx";

const ShipToolbar = ({ filterState, setFilterState, selectedCount, onOpenFilters, onDeleteSelected }) => {
  const handleSortChange = (value) => {
    let sortBy = "createdAt";
    let order = "desc";

    switch (value) {
      case "shipNameAsc":
        sortBy = "shipName";
        order = "asc";
        break;

      case "shipNameDesc":
        sortBy = "shipName";
        order = "desc";
        break;

      case "priceAsc":
        sortBy = "price";
        order = "asc";
        break;

      case "priceDesc":
        sortBy = "price";
        order = "desc";
        break;

      case "oldest":
        sortBy = "createdAt";
        order = "asc";
        break;

      case "newest":
      default:
        sortBy = "createdAt";
        order = "desc";
    }

    setFilterState((current) => ({
      ...current,
      sortBy,
      order,
      page: 1,
    }));
  };

  const currentSort =
    filterState.sortBy === "shipName" && filterState.order === "asc"
      ? "shipNameAsc"
      : filterState.sortBy === "shipName" && filterState.order === "desc"
        ? "shipNameDesc"
        : filterState.sortBy === "price" && filterState.order === "asc"
          ? "priceAsc"
          : filterState.sortBy === "price" && filterState.order === "desc"
            ? "priceDesc"
            : filterState.order === "asc"
              ? "oldest"
              : "newest";

  return (
    <Toolbar>
      <ToolbarLeft>
        <FilterButton onClick={onOpenFilters}>
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </FilterButton>

        <Sort items={SORT_VESSEL} value={currentSort} onChange={handleSortChange} />
      </ToolbarLeft>

      {selectedCount > 0 && (
        <ToolbarRight>
          <SelectedCount>{selectedCount} selected</SelectedCount>

          <Button $variation='danger' onClick={onDeleteSelected}>
            <Trash2 size={15} />
            Delete {selectedCount > 1 ? "items" : "item"}
          </Button>
        </ToolbarRight>
      )}
    </Toolbar>
  );
};

export default ShipToolbar;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  min-height: 4.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  height: 4rem;
  padding: 0 1.4rem;

  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-white);

  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-700);

  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: var(--color-grey-100);
    border-color: var(--color-grey-400);
  }
`;

const SelectedCount = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (max-width: 600px) {
    display: none;
  }
`;

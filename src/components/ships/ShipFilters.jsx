import styled from "styled-components";
import Checkbox from "../ui/Checkbox.jsx";
import { DEFAULT_FILTERS } from "../../constants/index.js";

const ShipFilters = ({ shipTypes, filterState, setFilterState, toggleFilter }) => {
  //Handle checkboxes
  const handleCheckbox = (name, value) => {
    setFilterState((current) => {
      const currentValue = current[name];
      return {
        ...current,
        [name]: currentValue.includes(value) ? currentValue.filter((item) => item !== value) : [...currentValue, value],
      };
    });
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  return (
    <ShipFiltersSection $toggleFilter={toggleFilter}>
      {/* Ship type checkboxes */}

      <div>
        <P>Ship types</P>
        <CheckboxGrid>
          {shipTypes?.map((t) => {
            return (
              <Checkbox
                key={t.id}
                id={t}
                checked={filterState.shipType?.includes(t.name)}
                onChange={() => handleCheckbox("shipType", t.name)}
                label={t.name}
                position='left'
              />
            );
          })}
        </CheckboxGrid>
      </div>

      {/* Publish checkbox */}
      <div>
        <P>Publish status</P>
        <Checkbox
          checked={filterState.isPublished}
          label='Published'
          position='left'
          onChange={(value) => setFilterState((current) => ({ ...current, isPublished: value }))}
        />
      </div>

      <ButtonWrap>
        <ResetButton onClick={resetFilters}>Clear filters</ResetButton>
      </ButtonWrap>
    </ShipFiltersSection>
  );
};

export default ShipFilters;

/* ================= styles ================= */

const ShipFiltersSection = styled.aside`
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);

  transform: ${({ $toggleFilter }) => ($toggleFilter ? "translateX(0)" : "translateX(-100%)")};
  padding: ${({ $toggleFilter }) => ($toggleFilter ? "2rem" : "0")};
  border: ${({ $toggleFilter }) => ($toggleFilter ? "1px solid var(--color-border)" : "none")};
  transition: transform 0.3s ease;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 1.2rem;
`;

const CheckboxGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
  align-items: center;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.7rem;
  font-weight: 600;
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
`;

const ResetButton = styled(ButtonStyle)`
  background-color: var(--color-grey-200);
  &:hover {
    opacity: 0.7;
  }
`;

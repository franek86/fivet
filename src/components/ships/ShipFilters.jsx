import styled from "styled-components";
import Checkbox from "../ui/Checkbox.jsx";

/* ================= styles ================= */

const ShipFiltersSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30rem;
  gap: 3rem;
  padding: 2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.7rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const ShipFilters = ({ shipTypes, filterState, setFilterState }) => {
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

  return (
    <ShipFiltersSection>
      {/* Ship type checkboxes */}

      <div>
        <P>Ship types</P>
        <CheckboxGrid>
          {shipTypes?.map((t) => (
            <Checkbox
              key={t.id}
              id={t}
              label={t.name}
              position='left'
              checked={filterState.shipTypes.includes(t.name)}
              onChange={() => handleCheckbox("shipType", t.name)}
            />
          ))}
        </CheckboxGrid>
      </div>

      {/* Publish checkbox */}
      <div>
        <P>Publish filter</P>
        <Checkbox checked={isPublished} label='Published' position='left' onChange={togglePublishFilter} />
      </div>

      <ButtonWrap>
        <ResetButton onClick={resetFilter}>Clear filters</ResetButton>
      </ButtonWrap>
    </ShipFiltersSection>
  );
};

export default ShipFilters;

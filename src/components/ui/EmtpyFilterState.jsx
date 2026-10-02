import styled from "styled-components";
import Button from "./Button.jsx";

const EmtpyFilterState = ({ title, onHandleReset }) => {
  return (
    <FilterState>
      <h2>{title}</h2>
      <p>Please clear filters or adjust your search.</p>
      <Button onClick={onHandleReset}>Clear filters</Button>
    </FilterState>
  );
};

export default EmtpyFilterState;

const FilterState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;

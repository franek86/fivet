import { useState } from "react";

import styled from "styled-components";

import Checkbox from "../ui/Checkbox.jsx";
import DatePicker from "react-datepicker";

import { customFormatDate } from "../../utils/formatDate.js";

const BlogFilters = ({ filterState, setFilterState, onResetFilter, filterToggle }) => {
  const today = new Date();
  const formatToday = customFormatDate(today);

  /* Local state */
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  /* CATEGORIES MOCK */
  const categoriesArray = [
    { id: 1, name: "News" },
    { id: 2, name: "Blog" },
    { id: 3, name: "Test" },
  ];
  const tagsArray = [
    { id: 1, name: "Nike" },
    { id: 2, name: "Puma" },
    { id: 3, name: "Test" },
  ];

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
    <ShipFiltersSection $filterToggle={filterToggle}>
      {/* Ship type checkboxes */}

      <div>
        <P>Categories</P>
        <CheckboxGrid>
          {categoriesArray?.map((cat) => (
            <Checkbox
              key={cat.id}
              id={cat.id}
              label={cat.name}
              position='left'
              checked={filterState.categories?.includes(cat.name)}
              onChange={() => handleCheckbox("categories", cat.name)}
            />
          ))}
        </CheckboxGrid>
      </div>

      <div>
        <P>Tags</P>
        <CheckboxGrid>
          {tagsArray?.map((tag) => (
            <Checkbox
              key={tag.id}
              id={tag.id}
              label={tag.name}
              position='left'
              checked={filterState.tags?.includes(tag.name)}
              onChange={() => handleCheckbox("tags", tag.name)}
            />
          ))}
        </CheckboxGrid>
      </div>

      {/* Date filter */}
      <DateWrap>
        <div>
          <P>Date from</P>
          <DatePicker
            selected={minDate}
            dateFormat='dd.MM.yyyy'
            onChange={(date) => setMinDate(date)}
            placeholderText={formatToday}
            calendarClassName='custom-calendar'
          />
        </div>
        <div>
          <P>Date to</P>
          <DatePicker
            selected={maxDate}
            dateFormat='dd.MM.yyyy'
            onChange={(date) => setMaxDate(date)}
            placeholderText={formatToday}
            calendarClassName='custom-calendar'
          />
        </div>
      </DateWrap>

      {/* Publish blog */}

      <ButtonWrap>
        {/*  <FilterButton onClick={applyFilter}>Filter</FilterButton> */}
        <ResetButton onClick={onResetFilter}>Clear filters</ResetButton>
      </ButtonWrap>
    </ShipFiltersSection>
  );
};

export default BlogFilters;

const ShipFiltersSection = styled.aside`
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  background-color: var(--color-white);
  z-index: 2;
  transition: transform 0.3s ease;

  gap: ${({ $filterToggle }) => ($filterToggle ? "2rem" : "0")};
  padding: ${({ $filterToggle }) => ($filterToggle ? "2rem" : "0")};
  border: ${({ $filterToggle }) => ($filterToggle ? "1px solid var(--color-border)" : "none")};
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.7rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
  align-items: center;
`;

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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

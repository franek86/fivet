import { useState } from "react";

import styled from "styled-components";

import Checkbox from "../ui/Checkbox.jsx";
import DatePicker from "react-datepicker";

import { customFormatDate } from "../../utils/formatDate.js";

/* ================= styles ================= */

const ShipFiltersSection = styled.section`
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: ${({ $toggleBox }) => ($toggleBox ? "clamp(220px, 20vw, 320px)" : "0px")};
  margin-top: 2.2rem;
  gap: 2rem;
  padding: 2rem;
  visibility: ${({ $toggleBox }) => ($toggleBox ? "visible" : "hidden")};
  background-color: var(--color-grey-0);
  opacity: ${({ $toggleBox }) => ($toggleBox ? "1" : "0")};
  transition: all 0.2s ease-in-out;
  box-shadow: var(--box-shadow-lg);
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

const FilterButton = styled(ButtonStyle)`
  background: var(--bg-linear-gradient);
  color: var(--color-grey-50);
  &:hover {
    background: var(--bg-linear-gradient-soft);
    color: var(--color-grey-700);
  }
`;

const ResetButton = styled(ButtonStyle)`
  background-color: var(--color-grey-300);
  &:hover {
    opacity: 0.7;
  }
`;

const BlogFilters = ({ selectedFilters, onCheckboxChange, onResetFilter, filterToggle }) => {
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

  return (
    <ShipFiltersSection $toggleBox={filterToggle}>
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
              checked={selectedFilters.categories?.includes(cat.name)}
              onChange={() => onCheckboxChange("categories", cat.name)}
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
              checked={selectedFilters.tags?.includes(tag.name)}
              onChange={() => onCheckboxChange("tags", tag.name)}
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

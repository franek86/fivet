import styled from "styled-components";

import { Search } from "lucide-react";

const SearchWrap = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  width: 100%;
  position: relative;
  border-radius: var(--border-radius-sm);

  @media screen and (min-width: 640px) {
    width: 23rem;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 4rem;
  border-radius: 50%;
  padding: 0.5rem;
  color: var(--color-text);
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: none;
  width: 100%;
  background-color: transparent;
  border-radius: var(--border-radius-sm);
`;

function SearchBar({ value, onChange, placeholder = "Search ..." }) {
  return (
    <SearchWrap>
      <SearchInput type='text' name='search' placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      <SearchIcon />
    </SearchWrap>
  );
}

export default SearchBar;

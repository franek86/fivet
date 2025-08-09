import { useRef } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice.js";

const SearchWrap = styled.div`
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  width: 30rem;
  position: relative;
  border-radius: 20px;
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3.2rem;
  background: var(--color-brand-500);
  border-radius: 50%;
  padding: 0.5rem;
  color: var(--color-grey-50);
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  border-radius: 20px;
  padding: 1rem 1.5rem;
`;

function SearchBar() {
  const lastKey = useRef(null);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);
  const [inputValue, setInputValue] = useState(searchTerm || "");
  const handleClick = (e) => {
    dispatch(setSearchTerm(inputValue));
  };

  const handleKeyDown = (e) => {
    lastKey.current = e.key;

    if (e.key === "Enter") handleClick();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (lastKey.current === "Backspace") {
      dispatch(setSearchTerm(e.target.value));
    }
  };

  return (
    <SearchWrap>
      <SearchInput type='text' name='q' placeholder='Search ...' value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
      <SearchIcon onClick={handleClick} />
    </SearchWrap>
  );
}

export default SearchBar;

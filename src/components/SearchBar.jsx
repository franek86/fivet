import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice.js";
import { useLocation, useNavigate } from "react-router";

const SearchWrap = styled.div`
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  width: ${({ width }) => width || "30rem"};
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

function SearchBar({ paramKey = "search", width = "30rem" }) {
  const lastKey = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = useSelector((state) => state.search.term);
  const [inputValue, setInputValue] = useState(searchTerm || "");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get(paramKey);
    if (query && query !== searchTerm) {
      dispatch(setSearchTerm(query));
      setInputValue(query);
    }
  }, [location.search, paramKey, dispatch, searchTerm]);

  const updateSearch = useCallback(() => {
    const params = new URLSearchParams(location.search);
    if (inputValue) {
      params.set(paramKey, inputValue);
    } else {
      params.delete(paramKey);
    }
    navigate({ search: params.toString() }, { replace: true });
    dispatch(setSearchTerm(inputValue));
  }, [inputValue, paramKey, location.search, navigate, dispatch]);

  const handleKeyDown = (e) => {
    lastKey.current = e.key;

    if (e.key === "Enter") updateSearch();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (lastKey.current === "Backspace") {
      const params = new URLSearchParams(location.search);
      params.set(paramKey, e.target.value);
      navigate({ search: params.toString() }, { replace: true });
      dispatch(setSearchTerm(e.target.value));
    }
  };

  return (
    <SearchWrap width={width}>
      <SearchInput
        type='text'
        name='search'
        placeholder='Search ...'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon onClick={updateSearch} />
    </SearchWrap>
  );
}

export default SearchBar;

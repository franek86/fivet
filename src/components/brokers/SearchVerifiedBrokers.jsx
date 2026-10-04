import React from "react";
import SearchBar from "../SearchBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../slices/searchSlice.js";

const SearchVerifiedBrokers = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.verifiedBrokers);

  return (
    <SearchBar
      value={search}
      onChange={(value) => dispatch(setSearch({ key: "verifiedBrokers", value: value }))}
      placeholder='Search brokers ...'
    />
  );
};

export default SearchVerifiedBrokers;

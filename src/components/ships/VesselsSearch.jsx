import { useDispatch, useSelector } from "react-redux";
import { setSearch, setVesselsSearch } from "../../slices/searchSlice.js";

import SearchBar from "../SearchBar.jsx";

const VesselsSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.vessels);

  return (
    <SearchBar value={search} placeholder='Search vessels...' onChange={(value) => dispatch(setSearch({ key: "vessels", value: value }))} />
  );
};

export default VesselsSearch;

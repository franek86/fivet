import { useDispatch, useSelector } from "react-redux";
import { setUsersSearch } from "../../slices/searchSlice.js";
import SearchBar from "../SearchBar.jsx";

const UsersSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.users);

  return <SearchBar value={search} onChange={(value) => dispatch(setUsersSearch(value))} placeholder='User search ...' />;
};

export default UsersSearch;

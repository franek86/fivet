import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar.jsx";
import { setAddressBookSearch } from "../../slices/searchSlice.js";

const AddressBookSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.addressBook);

  return <SearchBar value={search} onChange={(value) => dispatch(setAddressBookSearch(value))} placeholder='Search address book ...' />;
};

export default AddressBookSearch;

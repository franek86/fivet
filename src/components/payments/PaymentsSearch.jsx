import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar.jsx";
import { setPaymentsSearch } from "../../slices/searchSlice.js";

const PaymentsSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.payments);

  return <SearchBar value={search} onChange={(value) => dispatch(setPaymentsSearch(value))} placeholder='Search payments ...' />;
};

export default PaymentsSearch;

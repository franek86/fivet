import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar.jsx";
import { setBlogsSearch } from "../../slices/searchSlice.js";

const BlogSearch = () => {
  const dispacth = useDispatch();
  const search = useSelector((state) => state.search.blogs);

  return <SearchBar value={search} onChange={(value) => dispacth(setBlogsSearch(value))} placeholder='Search blog ...' />;
};

export default BlogSearch;

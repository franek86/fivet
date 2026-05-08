import Title from "../components/ui/Title.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryTable from "../components/post-category/CategoryTable.jsx";

import AddBlogCategory from "../components/post-category/AddBlogCategory.jsx";

function BlogCategory() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Blog category</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddBlogCategory />
        </div>
      </div>
      <CategoryTable />
    </>
  );
}

export default BlogCategory;

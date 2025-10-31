import AddCategory from "../components/categories/AddCategory.jsx";
import CategoryTable from "../components/categories/CategoryTable.jsx";
import Title from "../components/ui/Title.jsx";
import SearchBar from "../components/SearchBar.jsx";

function Categories() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Categories</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddCategory />
        </div>
      </div>
      <CategoryTable />
    </>
  );
}

export default Categories;

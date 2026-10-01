import AddCategory from "../../components/categories/AddCategory.jsx";
import CategoryTable from "../../components/categories/CategoryTable.jsx";
import Title from "../../components/ui/Title.jsx";

function Categories() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Categories</Title>
        <div className='search-container-right'>
          <AddCategory />
        </div>
      </div>
      <CategoryTable />
    </>
  );
}

export default Categories;

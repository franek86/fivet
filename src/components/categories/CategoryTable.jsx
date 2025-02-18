import { useCategories } from "../../hooks/categories/useCategories.js";
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import Sort from "../ui/Sort.jsx";
import Table from "../ui/Table.jsx";
import CategoryColumn from "./CategoryColumn.jsx";

function CategoryTable() {
  const items = [
    { value: "name-asc", name: "Sort by name (A-Z)" },
    { value: "name-desc", name: "Sort by name (Z-A)" },
  ];

  const { categories, count, isLoading, error } = useCategories();

  if (isLoading) return <Spinner />;

  if (error) return <div>Error something went wrong</div>;
  return (
    <>
      <Sort items={items} />
      <Table columns='100px 180px 1fr 80px'>
        <Table.Header>
          <div>No.</div>
          <div>Name</div>
          <div>Description</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body>
          {categories.map((cat, index) => (
            <CategoryColumn category={cat} key={cat.id} index={index} />
          ))}
        </Table.Body>

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default CategoryTable;

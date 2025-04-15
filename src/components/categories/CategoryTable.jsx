import { useCategories } from "../../hooks/categories/useCategories.js";
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Sort from "../ui/Sort.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CategoryColumn from "./CategoryColumn.jsx";

function CategoryTable() {
  const items = [
    { value: "name-asc", name: "Sort by name (A-Z)" },
    { value: "name-desc", name: "Sort by name (Z-A)" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  const tableColumns = [
    { header: "", accessor: "delete row" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Actions", accessor: "actions" },
  ];

  const { categories, count, isLoading, error, isFetching } = useCategories();
  const dataLength = categories.length;

  if (isLoading) return <Spinner />;

  if (error) return <div>Error something went wrong</div>;

  const renderRow = (item) => <CategoryColumn key={item.id} category={item} />;

  return (
    <>
      <Sort items={items} />
      {isFetching ? (
        <TablePlaceholder count={dataLength} />
      ) : (
        <CustomTable columns={tableColumns} renderRow={renderRow} data={categories} />
      )}
      <Pagination count={count} />
    </>
  );
}

export default CategoryTable;

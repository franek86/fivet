import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { LuTrash2 } from "react-icons/lu";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Sort from "../ui/Sort.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CategoryColumn from "./CategoryColumn.jsx";
import Button from "../ui/Button.jsx";
import EmptyState from "../EmptyState.jsx";
import Checkbox from "../ui/Checkbox.jsx";

import { useCategories } from "../../hooks/categories/useCategories.js";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function CategoryTable() {
  const searchTerm = useSelector((state) => state.search.term);

  // React Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  // Read params from URL
  const pageNumber = Number(searchParams.get("pageNumber") ?? 1);
  const sortBy = searchParams.get("sortBy") ?? "createdAt-desc";

  // Fetch  data using custom hook
  const { categories, count, isLoading, error, isFetching } = useCategories({
    pageNumber,
    sortBy,
    search: searchTerm?.trim() || undefined,
  });

  // Custom hook for selection and deletion
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(
    categories,
    useDeleteCategory().mutate
  );

  // Sort options
  const items = [
    { value: "name-asc", name: "Sort by name (A-Z)" },
    { value: "name-desc", name: "Sort by name (Z-A)" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  // Table columns configuration
  const tableColumns = [
    {
      header: (
        <Checkbox
          checked={selected?.length > 0 && selected?.length === categories?.length}
          onChange={(checked) => handleSelectAll(checked)}
        />
      ),
      accessor: "delete row",
      style: "hidden-table-sm",
    },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <Spinner />;
  if (error) return <div>Error something went wrong</div>;
  if (categories.length < 1) return <EmptyState message='No categories for now. Please create category' />;

  const renderRow = (item) => (
    <CategoryColumn key={item.id} category={item} selectedCat={selected} onCheckboxChange={handleCheckboxChange} />
  );

  return (
    <>
      <Header>
        <Sort items={items} label='Sort by:' />
        {selected.length > 0 && (
          <div>
            <Button $variation='danger' onClick={handleDeleteSelected} className='flex items-center gap-2'>
              <LuTrash2 />
              Delete {selected.length} item
              {selected.length > 1 ? "s" : ""}
            </Button>
          </div>
        )}
      </Header>
      {isFetching ? (
        <TablePlaceholder count={categories.length} />
      ) : (
        <>
          <CustomTable columns={tableColumns} renderRow={renderRow} data={categories} />
        </>
      )}
      <Pagination count={count} />
    </>
  );
}

export default CategoryTable;

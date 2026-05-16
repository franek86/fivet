/**
 * Third-party libraries
 */

import styled from "styled-components";
import { Trash2 } from "lucide-react";

/**
 * Custom Hooks
 */
import { useCategories } from "../../hooks/categories/useCategories.js";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";

/**
 * UI Components
 */
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Sort from "../ui/Sort.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CategoryColumn from "./CategoryColumn.jsx";
import Button from "../ui/Button.jsx";
import EmptyState from "../EmptyState.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import { useGetBlogCategories } from "../../hooks/useBlogCategory.js";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.8rem;
`;

function CategoryTable() {
  // Fetch  data using custom hook
  const { data, isLoading, error, isFetching } = useGetBlogCategories();

  // Custom hook for selection and deletion
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(data, useDeleteCategory().mutate);

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
        <Checkbox checked={selected?.length > 0 && selected?.length === data?.length} onChange={(checked) => handleSelectAll(checked)} />
      ),
      accessor: "delete row",
      style: "hidden-table-sm",
    },
    { header: "Title", accessor: "title" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <Spinner />;
  if (error) return <div>Error something went wrong</div>;
  if (data.length < 1) return <EmptyState message='No categories for now. Please create category' />;

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
              <Trash2 size={14} />
              <div>
                Delete {selected.length} item
                {selected.length > 1 ? "s" : ""}
              </div>
            </Button>
          </div>
        )}
      </Header>
      {isFetching ? (
        <TablePlaceholder count={data.length} />
      ) : (
        <>
          <CustomTable columns={tableColumns} renderRow={renderRow} data={data} />
        </>
      )}
    </>
  );
}

export default CategoryTable;

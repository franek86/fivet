/**
 * Third-party libraries
 */
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";
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
import { useState } from "react";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.8rem;
`;

function CategoryTable() {
  const DEFAULT_FILTERS = {
    search: "",
    page: 1,
    limit: 12,
    sortBy: "createdAt",
    order: "desc",
  };

  //Filter state with pagination and sort
  const [filterState, setFilterState] = useState(DEFAULT_FILTERS);

  // Fetch  data using custom hook
  const { categories, count, isLoading, error, isFetching } = useCategories(filterState);

  // Custom hook for selection and deletion
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(
    categories,
    useDeleteCategory().mutate,
  );

  // Sort options
  const items = [
    { value: "nameAsc", name: "Sort by name (A-Z)" },
    { value: "nameDesc", name: "Sort by name (Z-A)" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" },
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

  const renderRow = (item) => <CategoryColumn category={item} selectedCat={selected} onCheckboxChange={handleCheckboxChange} />;

  const handleSortChange = (value) => {
    let sortBy = "createdAt";
    let order = "desc";

    switch (value) {
      case "nameAsc":
        sortBy = "name";
        order = "asc";
        break;

      case "nameDesc":
        sortBy = "name";
        order = "desc";
        break;

      case "oldest":
        sortBy = "createdAt";
        order = "asc";
        break;

      case "newest":
      default:
        sortBy = "createdAt";
        order = "desc";
    }

    setFilterState((current) => ({
      ...current,
      sortBy,
      order,
      page: 1,
    }));
  };

  const currentSort =
    filterState.sortBy === "name" && filterState.order === "asc"
      ? "nameAsc"
      : filterState.sortBy === "name" && filterState.order === "desc"
        ? "nameDesc"
        : filterState.order === "asc"
          ? "oldest"
          : "newest";

  return (
    <>
      <Header>
        <Sort items={items} value={currentSort} onChange={handleSortChange} />
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
        <TablePlaceholder count={categories.length} />
      ) : (
        <>
          <CustomTable columns={tableColumns} renderRow={renderRow} data={categories} />
        </>
      )}
      <Pagination
        count={count}
        page={filterState.page}
        limit={filterState.limit}
        onPageChange={(page) =>
          setFilterState((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </>
  );
}

export default CategoryTable;

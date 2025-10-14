import { useState } from "react";
import { useCategories } from "../../hooks/categories/useCategories.js";
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Sort from "../ui/Sort.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CategoryColumn from "./CategoryColumn.jsx";
import Button from "../ui/Button.jsx";
import EmptyState from "../EmptyState.jsx";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory.js";
import { LuTrash2 } from "react-icons/lu";
import styled from "styled-components";
import Checkbox from "../ui/Checkbox.jsx";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DeleteCatWrap = styled.div``;

function CategoryTable() {
  const [selectedCat, setSelectedCat] = useState([]);
  const { categories, count, isLoading, error, isFetching } = useCategories();
  const { mutate } = useDeleteCategory();

  const handleSelectAll = (checked) => {
    if (checked) setSelectedCat(categories?.map((c) => c.id));
    else setSelectedCat([]);
  };

  const items = [
    { value: "name-asc", name: "Sort by name (A-Z)" },
    { value: "name-desc", name: "Sort by name (Z-A)" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  const tableColumns = [
    {
      header: (
        <Checkbox
          checked={selectedCat?.length > 0 && selectedCat?.length === categories?.length}
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

  const dataLength = categories.length;

  if (isLoading) return <Spinner />;
  if (error) return <div>Error something went wrong</div>;
  if (dataLength < 1) return <EmptyState message='No categories for now. Please create category' />;

  const handleCheckboxChange = (catId) => {
    setSelectedCat((prev) => (prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]));
  };

  const handleDeleteSelected = () => {
    selectedCat.forEach((id) => mutate(id));
    setSelectedCat([]);
  };

  const renderRow = (item) => (
    <CategoryColumn key={item.id} category={item} selectedCat={selectedCat} onCheckboxChange={handleCheckboxChange} />
  );

  return (
    <>
      <Header>
        <Sort items={items} label='Sort by:' />
        {selectedCat.length > 0 && (
          <DeleteCatWrap>
            <Button $variation='danger' onClick={handleDeleteSelected} className='flex items-center gap-2'>
              <LuTrash2 />
              Delete {selectedCat.length} item
              {selectedCat.length > 1 ? "s" : ""}
            </Button>
          </DeleteCatWrap>
        )}
      </Header>
      {isFetching ? (
        <TablePlaceholder count={dataLength} />
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

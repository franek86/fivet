import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Third-party libraries
 */
import { Contact, Trash2 } from "lucide-react";
import styled from "styled-components";

/**
 * Custom Hooks
 */
import { useDeleteAddressBook, useGetAddressBook } from "../../hooks/useAddressBook.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";

/**
 * UI Components
 */
import Sort from "../ui/Sort.jsx";
import EmptyFilterState from "../ui/EmtpyFilterState.jsx";
import AddressBookColumn from "./AddressBookColumn.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import EmptyState from "../EmptyState.jsx";
import Button from "../ui/Button.jsx";
import Checkbox from "../ui/Checkbox.jsx";

import { setClearSearch } from "../../slices/searchSlice.js";
import { PAGE_SIZE } from "../../constants/index.js";

function AddressBookTable() {
  const DEFAULT_FILTERS = {
    page: 1,
    limit: PAGE_SIZE,
    sortBy: "createdAt",
    order: "desc",
  };

  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.search.addressBook);

  //Lolcal state
  const [filterState, setFilterState] = useState(DEFAULT_FILTERS);

  const { data, isLoading, isFetching } = useGetAddressBook({ ...filterState, search: searchFilter });
  const { mutate } = useDeleteAddressBook();
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(data, mutate);

  //Sort
  const sortItems = [
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" },
  ];

  //Handle sort
  const handleSortChange = (value) => {
    let sortBy = "createdAt";
    let order = "desc";

    switch (value) {
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

  //Current sort
  const currentSort = filterState.order === "asc" ? "oldest" : "newest";

  // Current filters
  const hasFilters = Boolean(filterState.search);

  // Reset filters
  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
    dispatch(setClearSearch("addressBook"));
  };

  const tableColumns = [
    {
      header: (
        <Checkbox
          checked={selected?.length > 0 && selected?.length === data.address?.length}
          onChange={(checked) => handleSelectAll(checked)}
        />
      ),
      accessor: "delete row",
      style: "hidden-table-sm",
    },
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type", style: "hidden-table-sm" },
    { header: "Email", accessor: "Email" },
    { header: "Mobile number", accessor: "mobile" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <TablePlaceholder count={data?.address?.length} />;

  const renderRow = (item) => (
    <AddressBookColumn key={item.id} addressBook={item} selectedAddress={selected} onCheckboxChange={handleCheckboxChange} />
  );

  if (!isLoading && data.address?.length === 0) {
    if (!hasFilters) {
      return <EmptyFilterState title='No address book match in your filters' onHandleReset={resetFilters} />;
    }

    return (
      <EmptyState message='Your address book is empty.' icon={<Contact />}>
        <p>Save trusted owners, brokers, and business contacts here for quick access and easier communication.</p>
      </EmptyState>
    );
  }
  return (
    <>
      <Header>
        <Sort items={sortItems} value={currentSort} onChange={handleSortChange} />
      </Header>
      <Container>
        {selected.length > 0 && (
          <div>
            <Button $variation='danger' onClick={handleDeleteSelected}>
              <Trash2 size={14} />
              <div>
                Delete {selected.length} item
                {selected.length > 1 ? "s" : ""}
              </div>
            </Button>
          </div>
        )}
        {isFetching ? (
          <TablePlaceholder count={data.meta?.total} />
        ) : (
          <CustomTable columns={tableColumns} renderRow={renderRow} data={data.address} />
        )}
      </Container>
    </>
  );
}

export default AddressBookTable;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 2.8rem;
`;

const Header = styled.header`
  display: flex;
`;

const FilterState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;

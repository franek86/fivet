import Spinner from "../Spinner.jsx";
import AddressBookColumn from "./AddressBookColumn.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import EmptyState from "../EmptyState.jsx";
import Button from "../ui/Button.jsx";
import Checkbox from "../ui/Checkbox.jsx";

import { useDeleteAddressBook, useGetAddressBook } from "../../hooks/useAddressBook.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { Trash2 } from "lucide-react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 2.8rem;
`;

function AddressBookTable() {
  const { data, isLoading, isError, isFetching } = useGetAddressBook();
  const { mutate } = useDeleteAddressBook();
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(data, mutate);

  const tableColumns = [
    {
      header: (
        <Checkbox checked={selected?.length > 0 && selected?.length === data?.length} onChange={(checked) => handleSelectAll(checked)} />
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

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;
  const renderRow = (item) => (
    <AddressBookColumn key={item.id} addressBook={item} selectedAddress={selected} onCheckboxChange={handleCheckboxChange} />
  );
  const dataLength = data?.length;

  if (dataLength < 1) return <EmptyState message='Your address book is empty.' />;
  return (
    <Header>
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
      {isFetching ? <TablePlaceholder count={dataLength} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={data} />}
    </Header>
  );
}

export default AddressBookTable;

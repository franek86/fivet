import Spinner from "../Spinner.jsx";
import AddressBookColumn from "./AddressBookColumn.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import EmptyState from "../EmptyState.jsx";

import { useGetAddressBook } from "../../hooks/useAddressBook.js";

function AddressBookTable() {
  const { data, isLoading, isError, isFetching } = useGetAddressBook();
  const tableColumns = [
    { header: "", accessor: "delete row" },
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Email", accessor: "Email" },
    { header: "Mobile number", accessor: "mobile" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;
  const renderRow = (item) => <AddressBookColumn key={item.id} addressBook={item} />;
  const dataLength = data?.length;

  if (dataLength < 1) return <EmptyState message='Your address book is empty.' />;
  return (
    <>{isFetching ? <TablePlaceholder count={dataLength} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={data} />}</>
  );
}

export default AddressBookTable;

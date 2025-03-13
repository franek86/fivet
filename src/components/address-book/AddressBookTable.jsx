import Spinner from "../Spinner.jsx";
import Table from "../ui/Table.jsx";

import { useGetAddressBook } from "../../hooks/useAddressBook.js";
import AddressBookColumn from "./AddressBookColumn.jsx";

function AddressBookTable() {
  const { data, isLoading, isError } = useGetAddressBook();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <Table columns='1fr 1fr 1fr 80px'>
      <Table.Header>
        <div>Name</div>
        <div>Email</div>
        <div>Mobile number</div>
        <div>Actions</div>
      </Table.Header>
      <Table.Body>
        {data?.map((item) => (
          <AddressBookColumn item={item} key={item.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default AddressBookTable;

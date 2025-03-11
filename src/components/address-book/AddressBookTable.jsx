import Spinner from "../Spinner.jsx";
import Table from "../ui/Table.jsx";

import { useGetAddressBook } from "../../hooks/useAddressBook.js";
import AddressBookColumn from "./AddressBookColumn.jsx";

function AddressBookTable() {
  const { data, isLoading, isError } = useGetAddressBook();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <Table columns='50px 1fr 1fr 1fr 1fr 80px'>
      <Table.Header>
        <div>No.</div>
        <div>First name</div>
        <div>Last name</div>
        <div>Email</div>
        <div>Mobile number</div>
        <div>Actions</div>
      </Table.Header>
      <Table.Body>
        {data?.map((item, index) => (
          <AddressBookColumn item={item} key={item.id} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default AddressBookTable;

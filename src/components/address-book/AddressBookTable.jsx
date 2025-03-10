import { useGetAddressBook } from "../../hooks/useAddressBook.js";
import Spinner from "../Spinner.jsx";

function AddressBookTable() {
  const { data, isLoading, isError } = useGetAddressBook();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.map((item) => (
        <div>{item.first_name}</div>
      ))}
    </div>
  );
}

export default AddressBookTable;

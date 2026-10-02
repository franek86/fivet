import AddAddressBook from "../../components/address-book/AddAddressBook.jsx";
import AddressBookSearch from "../../components/address-book/AddressBookSearch.jsx";
import AddressBookTable from "../../components/address-book/AddressBookTable.jsx";
import Title from "../../components/ui/Title.jsx";

function AddressBook() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Address book</Title>
        <div className='search-container-right'>
          <AddressBookSearch />
          <AddAddressBook />
        </div>
      </div>
      <AddressBookTable />
    </>
  );
}

export default AddressBook;

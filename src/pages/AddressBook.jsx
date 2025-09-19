import AddAddressBook from "../components/address-book/AddAddressBook.jsx";
import AddressBookTable from "../components/address-book/AddressBookTable.jsx";
import Title from "../components/ui/Title.jsx";
import SearchBar from "../components/SearchBar.jsx";

function AddressBook() {
  return (
    <>
      <div class='search-container'>
        <Title tag='h1'>Address book</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddAddressBook />
        </div>
      </div>
      <AddressBookTable />
    </>
  );
}

export default AddressBook;

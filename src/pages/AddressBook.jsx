import styled from "styled-components";
import AddAddressBook from "../components/address-book/AddAddressBook.jsx";
import AddressBookTable from "../components/address-book/AddressBookTable.jsx";
import Title from "../components/ui/Title.jsx";
import SearchBar from "../components/SearchBar.jsx";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

function AddressBook() {
  return (
    <>
      <Flex>
        <Title tag='h1'>Address book</Title>
        <SearchBar />
        <AddAddressBook />
      </Flex>
      <AddressBookTable />
    </>
  );
}

export default AddressBook;

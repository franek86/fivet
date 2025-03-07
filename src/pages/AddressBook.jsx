import styled from "styled-components";
import AddAddressBook from "../components/address-book/AddAddressBook.jsx";
import AddressBookTable from "../components/address-book/AddressBookTable.jsx";
import Title from "../components/ui/Title.jsx";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function AddressBook() {
  return (
    <>
      <Flex>
        <Title tag='h1'>Address book</Title>
        <AddAddressBook />
      </Flex>
      <AddressBookTable />
    </>
  );
}

export default AddressBook;

import { useParams } from "react-router";

function SingleAddressBook() {
  const { id } = useParams();
  return <div>SIngleAddressBook - {id}</div>;
}

export default SingleAddressBook;

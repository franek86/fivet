import PaymentTable from "../components/payments/PaymentTable.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";

function Payments() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Payments</Title>
        <div className='search-container-right'>
          <SearchBar />
        </div>
      </div>
      <PaymentTable />
    </>
  );
}

export default Payments;

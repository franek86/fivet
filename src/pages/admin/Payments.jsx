import PaymentsSearch from "../../components/payments/PaymentsSearch.jsx";
import PaymentTable from "../../components/payments/PaymentTable.jsx";

import Title from "../../components/ui/Title.jsx";

function Payments() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Payments</Title>
        <div className='search-container-right'>
          <PaymentsSearch />
        </div>
      </div>
      <PaymentTable />
    </>
  );
}

export default Payments;

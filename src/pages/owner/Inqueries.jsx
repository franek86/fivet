import InqueryList from "../../components/inquiries/InqueryList.jsx";
import Title from "../../components/ui/Title.jsx";

const Inqueries = () => {
  return (
    <>
      <div className='custom-container'>
        <Title tag='h1'>My inqueries</Title>
      </div>
      <InqueryList />
    </>
  );
};

export default Inqueries;

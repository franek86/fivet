import React from "react";
import InqueryList from "../../components/inquiries/InqueryList.jsx";
import Title from "../../components/ui/Title.jsx";

function InqueryTest() {
  return (
    <>
      <div className='custom-container'>
        <Title tag='h1'>My inqueries</Title>
      </div>

      <InqueryList />
    </>
  );
}

export default InqueryTest;

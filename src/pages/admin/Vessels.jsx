import Title from "../../components/ui/Title.jsx";
import ShipsTable from "../../components/ships/ShipsTable.jsx";
import AddShip from "../../components/ships/AddShip.jsx";
import ApprovalCard from "../../components/ships/ApprovalCard.jsx";
import VesselsSearch from "../../components/ships/VesselsSearch.jsx";

function Vessels() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Vessels</Title>
        <div className='search-container-right'>
          <VesselsSearch />
          <AddShip />
        </div>
      </div>
      <ApprovalCard />
      <ShipsTable />
    </>
  );
}

export default Vessels;

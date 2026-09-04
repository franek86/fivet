import Title from "../../components/ui/Title.jsx";
import ShipsTable from "../../components/ships/ShipsTable.jsx";
import AddShip from "../../components/ships/AddShip.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import ApprovalCard from "../../components/ships/ApprovalCard.jsx";

function Vessels() {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Vessels</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddShip />
        </div>
      </div>
      <ApprovalCard />
      <ShipsTable />
    </>
  );
}

export default Vessels;

import ShipsTable from "../../components/ships/ShipsTable.jsx";
import Title from "../../components/ui/Title.jsx";
import VesselsSearch from "../../components/ships/VesselsSearch.jsx";
import AddShip from "../../components/ships/AddShip.jsx";

const Vessels = () => {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>My vessels</Title>
        <div className='search-container-right'>
          <VesselsSearch />
          <AddShip />
        </div>
      </div>
      <ShipsTable />
    </>
  );
};

export default Vessels;

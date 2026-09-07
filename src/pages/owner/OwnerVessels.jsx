import SearchBar from "../../components/SearchBar.jsx";
import AddShip from "../../components/ships/AddShip.jsx";
import Title from "../../components/ui/Title.jsx";
import OwnerApprovalList from "../../components/owner/OwnerApprovalList.jsx";

const OwnerVessels = () => {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>My vessels</Title>
        <div className='search-container-right'>
          <SearchBar />
          <AddShip />
        </div>
      </div>
      <OwnerApprovalList />
    </>
  );
};

export default OwnerVessels;

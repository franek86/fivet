import { useShips } from "../../../hooks/ships/useShips.js";
import UserStatisticCard from "../../ui/UserStatisticCard.jsx";
import Spinner from "../../Spinner.jsx";

const OwnerDahsboardStatistic = () => {
  //Read query params from URL
  const { ships = [], isLoading } = useShips();

  if (isLoading) return <Spinner />;

  const liveCount = ships?.filter((vessel) => vessel.listingStatus === "VERIFIED").length;
  const pendingCount = ships?.filter((vessel) => vessel.listingStatus === "PENDING").length;

  return <UserStatisticCard vessels={ships} liveCount={liveCount} pendingCount={pendingCount} />;
};

export default OwnerDahsboardStatistic;

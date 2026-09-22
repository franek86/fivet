import { useShips } from "../../../hooks/ships/useShips.js";
import UserStatisticCard from "../../ui/UserStatisticCard.jsx";
import Spinner from "../../Spinner.jsx";
import { DEFAULT_FILTERS } from "../../../constants/index.js";

const OwnerDahsboardStatistic = () => {
  const { ships, isLoading } = useShips(DEFAULT_FILTERS);

  if (isLoading) return <Spinner />;

  const liveCount = ships?.filter((vessel) => vessel.listingStatus === "VERIFIED").length;
  const pendingCount = ships?.filter((vessel) => vessel.listingStatus === "PENDING").length;

  return <UserStatisticCard vessels={ships} liveCount={liveCount} pendingCount={pendingCount} />;
};

export default OwnerDahsboardStatistic;

import { useSearchParams } from "react-router";
import { useShips } from "../../../hooks/ships/useShips.js";
import UserStatisticCard from "../../ui/UserStatisticCard.jsx";
import Spinner from "../../Spinner.jsx";

const OwnerDahsboardStatistic = () => {
  // React Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  //Read query params from URL
  const page = Number(searchParams.get("page") ?? 1);
  const { ships, isLoading } = useShips({
    page,
  });

  if (isLoading) return <Spinner />;

  const liveCount = ships?.filter((vessel) => vessel.listingStatus === "VERIFIED").length;
  const pendingCount = ships?.filter((vessel) => vessel.listingStatus === "PENDING").length;

  return <UserStatisticCard vessels={ships} liveCount={liveCount} pendingCount={pendingCount} />;
};

export default OwnerDahsboardStatistic;

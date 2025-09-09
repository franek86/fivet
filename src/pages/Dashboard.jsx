import StatisticBox from "../components/dashboard/StatisticBox.jsx";
import TopShips from "../components/dashboard/TopShips.jsx";
import Title from "../components/ui/Title.jsx";

function Dashboard() {
  return (
    <>
      <Title tag='h1'>Dashboard</Title>
      <StatisticBox />
      <TopShips />
    </>
  );
}

export default Dashboard;

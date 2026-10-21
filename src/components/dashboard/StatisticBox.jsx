/**
 * Third-party libraries
 */
import styled from "styled-components";
import { BookOpenCheck, CalendarDays, Ship, Users } from "lucide-react";

/**
 * UI Components
 */
import StatisticCard from "../ui/StatisticCard.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const StatisticBoxWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

function StatisticBox({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={3} />;
  }

  return (
    <StatisticBoxWrap>
      <StatisticCard icon={<Ship size={21} />} text='Total ships' data={data?.ships} description={`${data?.publishedShips} published`} />

      <StatisticCard icon={<Users size={21} />} text='Total users' data={data?.users} description={`${data?.activeUsers} verified`} />

      <StatisticCard icon={<CalendarDays size={21} />} text='Events' data={data?.adminEvents} />

      <StatisticCard icon={<BookOpenCheck size={21} />} text='Blogs' data={data?.blogs} description={`${data?.publishedBlogs} published`} />
      <StatisticCard icon={<Ship size={21} />} text='Pending ships' data={data?.pendingShips} description='Awaiting review' />
    </StatisticBoxWrap>
  );
}

export default StatisticBox;

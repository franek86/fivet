/**
 * React & Hooks
 */
import { Link } from "react-router";

/**
 * Third-party libraries
 */
import styled from "styled-components";
import { CircleUser, UserRound } from "lucide-react";

/**
 * Features
 */
import { customFormatDate } from "../../utils/formatDate.js";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const Box = styled.div`
  display: flex;
  padding: 12px 0;
  gap: 12px;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: 0;
  }
`;

const Image = styled.img`
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-lg);
`;
const BoxContent = styled.div`
  flex: 1;
  min-width: 0;
  a {
    display: block;
    color: var(--color-text);
    &:hover {
      color: var(--color-text-muted);
    }
  }
`;

const Date = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
  font-style: 600;
`;

const ImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-accent);
`;

function LastUsers({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <section className='card-container'>
      <div className='card-header'>
        <h3>Recent users</h3>
      </div>
      {data?.lastFiveUsers?.map((user) => (
        <Box key={user.id}>
          {user?.profile?.avatar ? (
            <Image src={user.profile.avatar} alt={user.fullName} />
          ) : (
            <ImagePlaceholder>
              <UserRound />
            </ImagePlaceholder>
          )}
          <BoxContent>
            <strong>{user.fullName}</strong>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </BoxContent>
          <Date>Created at: {customFormatDate(user.createdAt)}</Date>
        </Box>
      ))}
    </section>
  );
}

export default LastUsers;

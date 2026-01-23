import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import styled from "styled-components";
import { CircleUser } from "lucide-react";
import { customFormatDate } from "../../utils/formatDate.js";
import { getLastFiveUsersApi } from "../../services/apiProfile.js";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const Box = styled.div`
  display: flex;
  gap: 2rem;
`;

const Image = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: var(--color-grey-200);
`;
const BoxContent = styled.div`
  a {
    display: block;
    color: var(--color-blue-500);
    &:hover {
      color: var(--color-blue-700);
    }
  }
`;

const Date = styled.p`
  font-size: 1.25rem;
  color: var(--color-grey-500);
  font-style: italic;
`;

function LastUsers({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <Container>
      <h3>Last users</h3>
      {data?.lastFiveUsers?.map((user) => (
        <Box key={user.id}>
          {user.profile.avatar ? <Image src={user.profile.avatar} alt={user.fullName} /> : <CircleUser size={60} color='#d1d5db' />}
          <BoxContent>
            <strong>{user.fullName}</strong>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
            <Date>Created at: {customFormatDate(user.createdAt)}</Date>
          </BoxContent>
        </Box>
      ))}
    </Container>
  );
}

export default LastUsers;

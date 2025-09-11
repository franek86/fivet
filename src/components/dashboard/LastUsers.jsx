import styled from "styled-components";
import { useGetAllUserProfile } from "../../hooks/useProfile.js";
import { customFormatDate } from "../../utils/formatDate.js";
import Spinner from "../Spinner.jsx";
import { Link } from "react-router";

const Container = styled.section`
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

function LastUsers() {
  const { data, isPending, isError } = useGetAllUserProfile();

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <Container>
      <h3>Last users</h3>
      {data.map((user) => (
        <Box key={user.id}>
          <Image src={user.avatar} alt={user.fullName} />
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

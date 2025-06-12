import Spinner from "../Spinner.jsx";

import { useGetAllUserProfile } from "../../hooks/useProfile.js";
import { customFormatDate } from "../../utils/formatDate.js";
import styled from "styled-components";

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 4rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-md);
`;

const CardTop = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  padding: 2rem;
`;

const CardBottom = styled.div`
  display: grid;
  gap: 2rem;
  padding: 1.8rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardButton = styled.div`
  color: var(--color-grey-400);
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--color-grey-400);
  border-radius: 2rem;
`;

const CardButtonEdit = styled(CardButton)`
  &:hover {
    color: var(--color-grey-0);
    background-color: var(--color-green-700);
  }
`;
const CardButtonDelete = styled(CardButton)`
  &:hover {
    color: var(--color-grey-0);
    background-color: var(--color-red-700);
  }
`;

const CardImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: var(--color-grey-200);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  color: var(--color-blue-500);
  font-size: 1.3rem;
  &:hover {
    color: var(--color-blue-700);
  }
`;

const DateWrapp = styled.p`
  font-size: 1.25rem;
  padding-top: 1.2rem;
  color: var(--color-grey-500);
  font-style: italic;
`;

const CardBoxPlaceholder = styled.div`
  background: var(--linear-gradient);
  background-size: 200% 100%;
  min-width: 100%;
  width: 100px;
  height: 20px;
`;

const CardImagePlaceholder = styled(CardImage)`
  background: var(--linear-gradient);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
`;

const CardContentPlaceholder = styled(CardContent)`
  gap: 1rem;
  animation: shimmer 1.5s infinite linear;
`;

// Placeholder component
function UserProfileListPlaceholder() {
  return (
    <Card>
      <CardTop>
        <CardContentPlaceholder>
          <CardBoxPlaceholder></CardBoxPlaceholder>
          <CardBoxPlaceholder></CardBoxPlaceholder>
          <CardBoxPlaceholder></CardBoxPlaceholder>
        </CardContentPlaceholder>
        <CardImagePlaceholder></CardImagePlaceholder>
      </CardTop>
      <CardBottom>
        <CardBoxPlaceholder></CardBoxPlaceholder>
        <CardBoxPlaceholder></CardBoxPlaceholder>
      </CardBottom>
    </Card>
  );
}

function UserProfileList() {
  const { data, isPending, isError, isFetching } = useGetAllUserProfile();

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <CardWrap>
      {isFetching
        ? data.map((_, index) => <UserProfileListPlaceholder key={index} />)
        : data.map((item) => (
            <Card key={item.id}>
              <CardTop>
                <CardContent>
                  <strong>{item.fullName}</strong>
                  <Link href={`mailto:${item.email}`}>{item.email}</Link>
                  <DateWrapp>Created at {customFormatDate(item.createdAt)}</DateWrapp>
                </CardContent>

                {item.avatar ? <CardImage src={item.avatar} alt={item.fullName} /> : <CardImage />}
              </CardTop>
              <CardBottom>
                <CardButtonEdit>Edit</CardButtonEdit>
                <CardButtonDelete>Delete</CardButtonDelete>
              </CardBottom>
            </Card>
          ))}
    </CardWrap>
  );
}

export default UserProfileList;

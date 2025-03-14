import Spinner from "../Spinner.jsx";

import { useGetAllUserProfile } from "../../hooks/useProfile.js";
import { customFormatDate } from "../../utils/formatDate.js";
import styled from "styled-components";

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

function UserProfileList() {
  const { data, isPending, isError } = useGetAllUserProfile();

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <CardWrap>
      {data.map((item) => (
        <Card key={item.id}>
          <CardImage src={item.avatar} alt={item.fullName} />
          <CardContent>
            <div>{item.fullName}</div>
            <div>{item.email}</div>
            <div>Created at {customFormatDate(item.created_at)}</div>
          </CardContent>
        </Card>
      ))}
    </CardWrap>
  );
}

export default UserProfileList;

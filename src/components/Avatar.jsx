import styled from "styled-components";

import { useUser } from "../hooks/useAuth.js";
import Spinner from "./Spinner.jsx";
import { CircleUserRound } from "lucide-react";

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StyledNoAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  background-color: var(--color-grey-300);
  margin-right: 1rem;
`;

const StyledName = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;

const StyledImageAvatar = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

function Avatar() {
  const { data, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  const { fullName, avatar } = data.profile;

  return (
    <StyledAvatar>
      {avatar ? (
        <StyledImageAvatar src={avatar} />
      ) : (
        <StyledNoAvatar>
          <CircleUserRound size={50} />
        </StyledNoAvatar>
      )}
      <StyledName>Welcome {fullName ? fullName : <p>User</p>}</StyledName>
    </StyledAvatar>
  );
}

export default Avatar;

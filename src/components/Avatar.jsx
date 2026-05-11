import styled from "styled-components";
import { CircleUserRound } from "lucide-react";

import { useUser } from "../hooks/useAuth.js";

import Spinner from "./Spinner.jsx";

const StyledAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

const StyledNoAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: var(--color-grey-200);
  margin-right: 1rem;
`;

const StyledName = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;

const StyledImageAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 12px;
`;

function Avatar() {
  const { data, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  const { fullName, avatar } = data.profile;

  return (
    <StyledAvatar>
      <StyledName>Welcome {fullName ? fullName : <p>User</p>}</StyledName>
      {avatar ? (
        <StyledImageAvatar src={avatar} />
      ) : (
        <StyledNoAvatar>
          <CircleUserRound size={50} />
        </StyledNoAvatar>
      )}
    </StyledAvatar>
  );
}

export default Avatar;

import styled from "styled-components";
import { User } from "lucide-react";

import { useUser } from "../hooks/useAuth.js";

import Spinner from "./Spinner.jsx";

const StyledAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: var(--color-border);
  }
`;

const StyledNoAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: var(--color-white);
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

  const { avatar } = data;

  return (
    <StyledAvatar>
      {avatar ? (
        <StyledImageAvatar src={avatar} />
      ) : (
        <StyledNoAvatar>
          <User size={24} />
        </StyledNoAvatar>
      )}
    </StyledAvatar>
  );
}

export default Avatar;

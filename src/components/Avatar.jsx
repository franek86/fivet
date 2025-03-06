import { RxAvatar } from "react-icons/rx";
import styled from "styled-components";

import { useProfileData } from "../hooks/useProfile.js";
import Spinner from "./Spinner.jsx";

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
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
  const { data, isLoading } = useProfileData();

  if (isLoading) return <Spinner />;

  const { first_name, last_name, avatar } = data;

  return (
    <StyledAvatar>
      {avatar ? (
        <StyledImageAvatar src={avatar} />
      ) : (
        <StyledNoAvatar>
          <RxAvatar size={50} />
        </StyledNoAvatar>
      )}
      <StyledName>
        Welcome, {first_name ? first_name : <p>User</p>} {last_name ? last_name : null}
      </StyledName>
    </StyledAvatar>
  );
}

export default Avatar;

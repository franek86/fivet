import { useSelector } from "react-redux";

import { RxAvatar } from "react-icons/rx";
import styled from "styled-components";

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
  const firstName = useSelector((state) => state.profile.firstName);
  const lastName = useSelector((state) => state.profile.lastName);
  const avatar = useSelector((state) => state.profile.avatar);
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
        Welcome, {firstName ? firstName : <p>User</p>} {lastName ? lastName : null}
      </StyledName>
    </StyledAvatar>
  );
}

export default Avatar;

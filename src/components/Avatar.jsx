import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
`;

const StyledAvatarImg = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  background-color: var(--color-grey-300);
  margin-right: 1rem;
`;

function Avatar() {
  return (
    <StyledAvatar>
      <StyledAvatarImg></StyledAvatarImg>
      Frane
    </StyledAvatar>
  );
}

export default Avatar;

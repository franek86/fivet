import styled from "styled-components";
import ProfileData from "../components/profile/ProfileData.jsx";
import Title from "../components/ui/Title.jsx";

const Wrapper = styled.div`
  max-width: 40rem;
  padding: 1.2rem;
`;

function Profile() {
  return (
    <>
      <Title tag='h1'>Profile</Title>
      <Wrapper>
        <ProfileData />
      </Wrapper>
    </>
  );
}

export default Profile;

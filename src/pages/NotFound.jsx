import styled from "styled-components";
import BackBtn from "../components/BAckBtn.jsx";
import Logo from "../components/Logo.jsx";

const Wrap = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 8rem;
  font-weight: 600;
`;

const P = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 3rem;
`;

function NotFound() {
  return (
    <Wrap>
      <Logo />
      <Heading>Page not found</Heading>
      <P>404 error</P>
      <BackBtn />
    </Wrap>
  );
}

export default NotFound;

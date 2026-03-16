import styled from "styled-components";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm.jsx";

const Wrapper = styled.div`
  max-width: 40rem;
  padding: 1.2rem;
`;

function ForgotPassword() {
  return (
    <Wrapper>
      <ForgotPasswordForm />
    </Wrapper>
  );
}

export default ForgotPassword;

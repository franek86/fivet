import styled from "styled-components";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm.jsx";

const Wrapper = styled.div`
  padding: 4rem 3rem;
  background-color: var(--color-white);
`;

function ForgotPassword() {
  return (
    <Wrapper>
      <ForgotPasswordForm />
    </Wrapper>
  );
}

export default ForgotPassword;

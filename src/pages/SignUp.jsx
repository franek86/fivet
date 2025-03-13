import { Link } from "react-router";
import styled from "styled-components";

import SignUpForm from "../components/auth/SignUpForm.jsx";
import Title from "../components/ui/Title.jsx";

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  padding: 4rem 1.5rem;
  border: 1px solid var(--color-brand-100);
  box-shadow: var(--box-shadow-lg);
  width: 100%;
  text-align: center;
`;

const TextWrap = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const LinkText = styled(Link)`
  color: var(--color-brand-600);

  &:hover {
    color: var(--color-brand-400);
  }
`;

function SignUp() {
  return (
    <FormWrap>
      <Title>Sign up</Title>
      <SignUpForm />
      <TextWrap>
        You already have a Fivet account? Please <LinkText to='/'>Sign in</LinkText>.
      </TextWrap>
    </FormWrap>
  );
}

export default SignUp;

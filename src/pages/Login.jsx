import { Link } from "react-router";

import Title from "../components/ui/Title.jsx";

import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm.jsx";

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

function Login() {
  return (
    <FormWrap>
      <Title>Log in</Title>
      <LoginForm />
      <TextWrap>
        Don't have a Fivet account? Please <LinkText to='/register'>Sign up</LinkText>.
      </TextWrap>
    </FormWrap>
  );
}

export default Login;

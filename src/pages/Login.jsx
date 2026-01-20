import { Link, useNavigate } from "react-router";

import styled from "styled-components";

import Title from "../components/ui/Title.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  padding: 4rem 2.8rem;
  box-shadow: var(--shadow-lg);
  width: 100%;
  text-align: center;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
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
  const navigate = useNavigate();
  return (
    <FormWrap>
      {/*  <button onClick={() => navigate("/sign-up?plan=STANDARD")}>Standard</button>
      <button onClick={() => navigate("/sign-up?plan=PREMIUM")}>Premium</button> */}
      <Title>Login</Title>
      <p>Please sign in to continue</p>
      <LoginForm />
      <TextWrap>
        Don't have a Fivet account? Please <LinkText to='/sign-up'>Sign up</LinkText>.
      </TextWrap>
    </FormWrap>
  );
}

export default Login;

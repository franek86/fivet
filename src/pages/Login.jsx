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

const ButtonTest = styled.div`
  background: var(--bg-linear-gradient);
  padding: 1rem;
  color: var(--color-grey-0);
  cursor: pointer;

  &:hover {
    background: var(--bg-linear-gradient-soft);
  }
`;

function Login() {
  const navigate = useNavigate();
  return (
    <FormWrap>
      <ButtonTest className='btn bg-gradient' onClick={() => navigate("/sign-up?plan=STANDARD")}>
        Standard test
      </ButtonTest>
      <ButtonTest className='btn bg-gradient' onClick={() => navigate("/sign-up?plan=PREMIUM")}>
        Premium test
      </ButtonTest>
      <Title>Login</Title>
      <p>Please sign in to continue</p>
      <LoginForm />
      {/*  <TextWrap>
        Don't have a Fivet account? Please <LinkText to='/sign-up'>Sign up</LinkText>.
      </TextWrap> */}
    </FormWrap>
  );
}

export default Login;

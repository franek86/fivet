import { useNavigate, Link } from "react-router";

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
  text-align: center;
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
`;

const LinkText = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  &:hover {
    color: var(--color-text-muted);
  }
`;

function Login() {
  const navigate = useNavigate();
  return (
    <FormWrap>
      {/*  <ButtonTest className='btn bg-gradient' onClick={() => navigate("/sign-up?plan=STANDARD")}>
        Standard test
      </ButtonTest>
      <ButtonTest className='btn bg-gradient' onClick={() => navigate("/sign-up?plan=PREMIUM")}>
        Premium test
      </ButtonTest> */}
      <Title>Login</Title>
      <p>Please sign in to continue</p>
      <LoginForm />
      <div>
        Don't have a Fivet account? Please <LinkText to='/sign-up'>Sign up</LinkText>.
      </div>
    </FormWrap>
  );
}

export default Login;

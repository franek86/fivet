import { Link } from "react-router";
import styled from "styled-components";

const plans = ["STANDARD", "PREMIUM"];

function TestStripe() {
  return (
    <Wrapper>
      {plans.map((plan) => (
        <Link key={plan} to={`/sign-up?plan=${plan}`}>
          {plan}
        </Link>
      ))}
    </Wrapper>
  );
}

export default TestStripe;

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100vh;
`;

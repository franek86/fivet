import { useSelector } from "react-redux";
import Title from "../components/ui/Title.jsx";
import styled from "styled-components";
import BillingCard from "../components/BillingCard.jsx";

import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const CurrentSubscription = styled.div`
  background-color: var(--color-green-700);
  color: var(--color-grey-0);
  max-width: max-content;
  height: max-content;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--border-radius-md);
`;

const Back = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--color-brand-500);
  font-size: 1.6rem;
  font-weight: 600;
  transform: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
`;

function Billing() {
  const subscription = useSelector((state) => state.auth.subscription);
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <div>
          <Title tag='h1'>Billing</Title>
          <CurrentSubscription>{subscription}</CurrentSubscription>
        </div>
        {subscription && (
          <Back onClick={() => navigate("/dashboard")}>
            <ChevronLeft />
            Back
          </Back>
        )}
      </Wrapper>

      <BillingCard />
    </Container>
  );
}

export default Billing;

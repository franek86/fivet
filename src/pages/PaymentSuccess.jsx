import React from "react";

import styled, { keyframes } from "styled-components";
import Button from "../components/ui/Button.jsx";
import { Link } from "react-router";

/* Animations */

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

/* Layout */

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: var(--border-radius-lg);
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  padding: 40px;
  background: var(--color-white);
  border: var(--border-color);
  box-shadow: var(--shadow-lg);
  text-align: center;
`;

/* Success Icon */

const SuccessBadge = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 auto 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-success);

  animation: ${float} 3s ease-in-out infinite;
`;

const Checkmark = styled.span`
  color: var(--color-white);
  font-size: 42px;
  font-weight: 700;
`;

/* Typography */

const Title = styled.h1`
  margin: 0;
  color: var(--color-text);
  font-size: 3rem;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 16px 0 32px;
  color: var(--color-text);
  line-height: 1.7;
  font-size: 1.6rem;
`;

/* Details */

const OrderInfo = styled.div`
  padding: 20px;
  margin-bottom: 32px;
  border-radius: 18px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Label = styled.span`
  color: var(--color-text);
  font-size: 1.4rem;
`;

const Value = styled.span`
  color: var(--color-text);
  font-weight: 600;
`;

const Status = styled.span`
  color: var(--color-success);
  font-weight: 700;
`;

/* Actions */

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

const PaymentSuccess = () => {
  return (
    <Container>
      <BackgroundGlow />

      <Card>
        <SuccessBadge>
          <Checkmark>✓</Checkmark>
        </SuccessBadge>

        <Title>Payment Successful</Title>

        <Description>Your payment has been processed successfully. A confirmation email has been sent to your inbox.</Description>

        <OrderInfo>
          <InfoRow>
            <Label>Transaction ID</Label>
            <Value>#TRX-82734921</Value>
          </InfoRow>

          <InfoRow>
            <Label>Amount Paid</Label>
            <Value>$99.00</Value>
          </InfoRow>

          <InfoRow>
            <Label>Status</Label>
            <Status>Completed</Status>
          </InfoRow>
        </OrderInfo>

        <ButtonGroup>
          <Link to='/dashboard'>
            <Button>Go to Dashboard</Button>
          </Link>
          <Button>Download Receipt</Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;

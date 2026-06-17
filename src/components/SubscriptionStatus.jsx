import { Sparkles } from "lucide-react";
import React from "react";
import styled from "styled-components";

const Label = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  background-color: #daa520;
  color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: 0.8rem;
`;

const SubscriptionStatus = ({ subscription }) => {
  return (
    <Label>
      <Sparkles size={20} />
      {subscription}
    </Label>
  );
};

export default SubscriptionStatus;

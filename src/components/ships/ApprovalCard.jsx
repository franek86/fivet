import React from "react";

import styled from "styled-components";

import Spinner from "../Spinner.jsx";
import { usePendingShips } from "../../hooks/ships/usePendingShips.js";
import { useNavigate } from "react-router";

const ApprovalCard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = usePendingShips();

  if (data?.meta?.total === 0) return;

  if (isLoading) return <Spinner />;

  return (
    <Card>
      <Icon>
        <span>⚓</span>
      </Icon>

      <Content>
        <Title>{data?.meta?.total} vessels waiting for your approval</Title>

        <Description>Review submitted vessels before they go live on the website.</Description>

        <Action onClick={() => navigate("/admin/vessels/approvals")}>
          Review vessels
          <Arrow>→</Arrow>
        </Action>
      </Content>
    </Card>
  );
};

export default ApprovalCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 20px 24px;

  background: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;

  box-shadow: var(--shadow-md);
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: var(--color-accent);
  border-radius: 10px;

  font-size: 22px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 5px;

  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
`;

const Description = styled.p`
  margin: 0;

  font-size: 14px;
  color: var(--color-text-muted);
`;

const Action = styled.button`
  margin-top: 10px;
  padding: 0;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: none;
  background: none;

  font-size: 14px;
  font-weight: 600;
  color: var(--color-success);

  cursor: pointer;

  &:hover {
    color: var(--color-success-600);
  }
`;

const Arrow = styled.span`
  font-size: 17px;
  transition: transform 0.2s ease;

  ${Action}:hover & {
    transform: translateX(3px);
  }
`;

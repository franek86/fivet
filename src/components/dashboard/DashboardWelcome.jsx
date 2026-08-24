import React from "react";
import styled from "styled-components";

import Title from "../ui/Title.jsx";

const Header = styled.header`
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;

  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2.8rem 3.2rem;

  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);

  background: ${({ $bgColor }) => {
    switch ($bgColor) {
      case "ADMIN":
        return "var(--color-accent)";
      case "BUYER":
        return "var(--dashboard-buyer-bg)";
      case "OWNER":
        return "var(--dashboard-owner-bg)";
      case "BROKER":
        return "var(--dashboard-broker-bg)";
      default:
        return "#d1d5db";
    }
  }};
`;

const Description = styled.p`
  max-width: 600px;

  margin: 1rem 0 1.8rem;

  color: var(--color-text-muted);

  font-size: 1.45rem;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;

  margin-bottom: 1rem;

  color: var(--color-text-muted);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const getWelcomeText = (role) => {
  switch (role) {
    case "ADMIN":
      return {
        title: "Welcome back",
        subtitle: "Here's an overview of what's happening across Fivet today.",
      };

    case "BROKER":
      return {
        title: "Welcome back",
        subtitle: "Keep your vessel portfolio, leads, and buyer relationships moving forward.",
      };

    case "OWNER":
      return {
        title: "Welcome back",
        subtitle: "Everything you need to manage your vessels and broker relationships, in one place.",
      };

    case "BUYER":
      return {
        title: "Welcome back",
        subtitle: "Explore opportunities, follow your enquiries, and find the right vessel for you.",
      };

    default:
      return {
        title: "Welcome back",
        subtitle: "Here's what's happening today on Fivet.",
      };
  }
};

const DashboardWelcome = ({ user }) => {
  const welcomeText = getWelcomeText(user.role);
  return (
    <Header $bgColor={user.role}>
      <div>
        <Eyebrow>Fivet Dashboard</Eyebrow>

        <Title tag='h1'>
          {welcomeText.title}, {user.fullName} 👋
        </Title>
        <Description>{welcomeText.subtitle}</Description>
      </div>
    </Header>
  );
};

export default DashboardWelcome;

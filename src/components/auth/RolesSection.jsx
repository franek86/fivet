import React from "react";
import styled from "styled-components";

import { ShipWheel, Ship, Search } from "lucide-react";
import Label from "../ui/Label.jsx";

const roles = [
  {
    value: "BROKER",
    label: "Broker",
    description: "Represent vessels and connect buyers with sellers.",
    icon: ShipWheel,
  },
  {
    value: "OWNER",
    label: "Owner",
    description: "List and sell your vessels on the marketplace.",
    icon: Ship,
  },
  {
    value: "BUYER",
    label: "Buyer",
    description: "Search for vessels and contact sellers.",
    icon: Search,
  },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 2rem 1.5rem;

  background-color: ${({ $selected }) => ($selected ? "var(--color-accent)" : "transparent")};

  color: ${({ $selected }) => ($selected ? "var(--color-white)" : "var(--color-text)")};

  border: 1px solid ${({ $selected }) => ($selected ? "var(--color-accent)" : "var(--color-border)")};

  border-radius: var(--border-radius-lg);

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: var(--color-accent);
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: var(--border-radius-lg);

  background-color: ${({ $selected }) => ($selected ? "var(--color-text)" : "transparent")};
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  color: var(--color-text);
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
`;

const RolesSection = ({ value, onChange }) => {
  return (
    <>
      <Label>Choose role *</Label>
      <Container>
        {roles.map((role) => {
          const Icon = role.icon;
          const selected = value === role.value;

          return (
            <Card key={role.value} type='button' $selected={selected} onClick={() => onChange(role.value)}>
              <IconWrapper $selected={selected}>
                <Icon size={32} strokeWidth={1.7} />
              </IconWrapper>

              <Title>{role.label}</Title>

              <Description>{role.description}</Description>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default RolesSection;

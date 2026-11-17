import { useState } from "react";
import styled from "styled-components";

const TabHeader = styled.header`
  display: flex;
  width: max-content;
  border-radius: 12px;
  padding: 4px;
  gap: 1rem;
  background-color: var(--color-grey-200);
`;

const TabLabel = styled.div`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ $isActive }) => ($isActive ? "var(--color-accent)" : "var(--color-white)")};
  border-radius: var(--border-radius-md);
  color: ${({ $isActive }) => ($isActive ? "var(--color-white)" : "var(--color-accent)")};
  cursor: pointer;

  &:hover {
    background-color: var(--color-accent);
    color: var(--color-white);
  }
`;
const TabContent = styled.main`
  padding: 2rem;
  background-color: var(--color-white);
  margin-top: 1rem;
  border-radius: var(--border-radius-lg);
`;

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <TabHeader>
        {tabs?.map((tab, index) => (
          <TabLabel key={index} onClick={() => setActiveTab(index)} $isActive={activeTab === index}>
            {tab.label}
          </TabLabel>
        ))}
      </TabHeader>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </div>
  );
};

export default Tabs;

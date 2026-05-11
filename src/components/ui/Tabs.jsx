import { useState } from "react";
import styled from "styled-components";

const Tab = styled.div`
  background-color: var(--color-white);
`;

const TabHeader = styled.header`
  display: flex;
  width: max-content;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  background-color: var(--color-grey-200);
`;

const TabLabel = styled.div`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? "#fff" : "transparent")};
  border-radius: var(--border-radius-md);
  color: var(--color-text-muted);
  cursor: pointer;

  &:hover {
    background-color: var(--color-accent);
  }
`;
const TabContent = styled.main`
  padding: 2rem;
`;

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Tab>
      <TabHeader>
        {tabs?.map((tab, index) => (
          <TabLabel key={index} onClick={() => setActiveTab(index)} $isActive={activeTab === index}>
            {tab.label}
          </TabLabel>
        ))}
      </TabHeader>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </Tab>
  );
};

export default Tabs;

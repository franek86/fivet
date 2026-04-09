import { useState } from "react";
import styled from "styled-components";

const Tab = styled.div`
  background-color: var(--color-grey-0);
`;

const TabHeader = styled.header`
  display: flex;
`;

const TabLabel = styled.div`
  font-size: 1.4rem;
  background-color: ${({ $isActive }) => ($isActive ? "var(--color-brand-200)" : "var(--color-grey-50)")};
  padding: 1.2rem;
  font-weight: bold;
  border-right: 1px solid var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-200);
  box-shadow: var(--box-shadow-md);
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-200);
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

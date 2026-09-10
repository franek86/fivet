import React from "react";
import styled from "styled-components";
import VesselsCard from "../ui/VessselsCard.jsx";
import Spinner from "../Spinner.jsx";
import { useShips } from "../../hooks/ships/useShips.js";
import { useSearchParams } from "react-router";

const tabs = [
  { label: "All Vessels", value: "ALL" },
  { label: "Approved", value: "APPROVED" },
  { label: "Pending", value: "PENDING" },
  { label: "Rejected", value: "REJECTED" },
];

const OwnerApprovalList = () => {
  // React Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  //Read query params from URL
  const page = Number(searchParams.get("page") ?? 1);
  const { ships: vessels, isLoading } = useShips({
    page,
  });

  const [activeTab, setActiveTab] = React.useState("ALL");

  if (isLoading) return <Spinner />;

  const filteredVessels = vessels.filter((vessel) => {
    const matchesTab = activeTab === "ALL" || vessel.listingStatus === activeTab;

    return matchesTab;
  });

  const liveCount = vessels.filter((vessel) => vessel.listingStatus === "VERIFIED").length;

  const pendingCount = vessels.filter((vessel) => vessel.listingStatus === "PENDING").length;

  return (
    <>
      <Toolbar>
        <Tabs>
          {tabs.map((tab) => (
            <Tab key={tab.value} $active={activeTab === tab.value} onClick={() => setActiveTab(tab.value)}>
              {tab.label}

              {tab.value === "APPROVED" && <TabCount>{liveCount}</TabCount>}

              {tab.value === "PENDING" && <TabCount>{pendingCount}</TabCount>}
            </Tab>
          ))}
        </Tabs>
      </Toolbar>

      {filteredVessels.length === 0 ? (
        <EmptyState>
          <EmptyIcon>⚓</EmptyIcon>

          <EmptyTitle>No vessels found</EmptyTitle>

          <EmptyText>There are no vessels matching your current filters.</EmptyText>
        </EmptyState>
      ) : (
        <VesselGrid>
          {filteredVessels.map((vessel) => (
            <VesselsCard vessel={vessel} />
          ))}
        </VesselGrid>
      )}
    </>
  );
};
export default OwnerApprovalList;

/* ---------- Empty ---------- */

const EmptyState = styled.div`
  padding: 80px 20px;
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: 16px;
  background: var(--color-white);
`;

const EmptyIcon = styled.div`
  margin-bottom: 14px;
  font-size: 28px;
`;

const EmptyTitle = styled.h3`
  margin: 0;
  color: var(--color-text);
  font-size: 17px;
`;

const EmptyText = styled.p`
  margin: 7px 0 0;
  color: var(--color-text-muted);
  font-size: 13px;
`;

const VesselGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-grey-200);
  border-radius: 10px;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  border-radius: 7px;
  padding: 8px 12px;
  background: ${({ $active }) => ($active ? "var(--color-white)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--color-text)" : "var(color-grey-200)")};
  box-shadow: ${({ $active }) => ($active ? "var(--shadow-md)" : "none")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const TabCount = styled.span`
  min-width: 18px;
  padding: 2px 5px;
  border-radius: 999px;
  background: var(--color-border);
  font-size: 10px;
`;

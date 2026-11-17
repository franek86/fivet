import { useState } from "react";

import { AlertCircle, Inbox } from "lucide-react";
import BadgeStatus from "./BadgeStatus.jsx";

import { useGetMyInqueries } from "../../hooks/useInquery.js";

import {
  ActiveBar,
  Avatar,
  DetailPanel,
  ItemBadge,
  ItemBody,
  ItemButton,
  ItemName,
  ItemPreview,
  ItemShip,
  ItemTime,
  ItemTop,
  Layout,
  List,
  ListPanel,
  ListScroll,
  OutlineButton,
  StateBox,
  StateIcon,
  StateText,
  StateTitle,
  Tab,
  TabCount,
  Tabs,
  Toolbar,
  UnreadDot,
} from "./Inquery.styles.js";
import InqueryDetails from "./InqueryDetails.jsx";
import { customFormatDate } from "../../utils/formatDate.js";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const TABS = [
  { value: "ALL", label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "RESPONDED", label: "Responded" },
  { value: "CLOSED", label: "Closed" },
];

function InqueryList() {
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetMyInqueries({
    search: search,
    status: status === "ALL" ? undefined : status,
  });

  const items = data?.items ?? [];
  const counts = data?.counts;

  const current = items.find((i) => i.id === selected?.id) ?? selected;
  const hasFilters = Boolean(search) || status !== "ALL";

  const countFor = (tab) => {
    if (!counts) return undefined;
    return tab === "ALL" ? counts.OPEN + counts.RESPONDED + counts.CLOSED : counts[tab];
  };

  const handleStatusChange = (next) => {
    if (!current) return;
    updateStatus(current.id, next);
    setSelected((prev) => (prev ? { ...prev, status: next } : prev));
  };

  return (
    <>
      <Toolbar>
        <Tabs role='tablist' aria-label='Filter by status'>
          {TABS.map((tab) => {
            const active = status === tab.value;
            const count = countFor(tab.value);
            return (
              <Tab key={tab.value} role='tab' type='button' $active={active} aria-selected={active} onClick={() => setStatus(tab.value)}>
                {tab.label}
                {count !== undefined && <TabCount $active={active}>{count}</TabCount>}
              </Tab>
            );
          })}
        </Tabs>
      </Toolbar>

      <Layout>
        <ListPanel $hiddenOnMobile={current}>
          <ListScroll>
            {isLoading ? (
              <TablePlaceholder count={4} />
            ) : isError ? (
              <StateBox>
                <StateIcon>
                  <AlertCircle size={24} />
                </StateIcon>
                <StateTitle>Could not load inquiries</StateTitle>
                <StateText>Check your connection and try again.</StateText>
                <OutlineButton type='button' onClick={() => refetch()}>
                  Try again
                </OutlineButton>
              </StateBox>
            ) : items.length === 0 ? (
              <StateBox>
                <StateIcon>
                  <Inbox size={24} />
                </StateIcon>
                <StateTitle>{hasFilters ? "No inquiries match your filters" : "No inquiries yet"}</StateTitle>
                <StateText>
                  {hasFilters ? "Clear the search or pick another status." : "New messages from buyers will show up here."}
                </StateText>
              </StateBox>
            ) : (
              <List>
                {items.map((inquiry) => {
                  const active = current?.id === inquiry.id;
                  const isOpen = inquiry.status === "OPEN";

                  return (
                    <li key={inquiry.id}>
                      <ItemButton
                        type='button'
                        $active={active}
                        aria-current={active ? "true" : undefined}
                        onClick={() => setSelected(inquiry)}
                      >
                        {active && <ActiveBar />}

                        <Avatar $size={36} $font={12}>
                          {inquiry.senderName}
                        </Avatar>

                        <ItemBody>
                          <ItemTop>
                            <ItemName $unread={isOpen}>{inquiry.senderName}</ItemName>
                            <ItemTime dateTime={customFormatDate(inquiry.createdAt)}>{customFormatDate(inquiry.createdAt)}</ItemTime>
                          </ItemTop>

                          <ItemShip>{inquiry.ship.shipName}</ItemShip>
                          <ItemPreview>{inquiry.message}</ItemPreview>

                          {!isOpen && (
                            <ItemBadge>
                              <BadgeStatus $status={inquiry.status} />
                            </ItemBadge>
                          )}
                        </ItemBody>

                        {isOpen && <UnreadDot role='img' aria-label='Open' />}
                      </ItemButton>
                    </li>
                  );
                })}
              </List>
            )}
          </ListScroll>
        </ListPanel>

        <DetailPanel $visibleOnMobile={current}>
          {current ? (
            <InqueryDetails inquiry={current} isUpdating={false} onBack={() => setSelected(null)} onStatusChange={handleStatusChange} />
          ) : (
            <StateBox>
              <StateIcon>
                <Inbox size={24} />
              </StateIcon>
              <StateTitle>Select an inquiry</StateTitle>
              <StateText>Pick a message from the list to read it and reply.</StateText>
            </StateBox>
          )}
        </DetailPanel>
      </Layout>
    </>
  );
}

export default InqueryList;

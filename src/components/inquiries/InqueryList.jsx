import { useEffect, useState } from "react";

import { AlertCircle, Inbox } from "lucide-react";
import BadgeStatus from "./BadgeStatus.jsx";

import { useGetMyInqueries, useUpdateStatusInquery } from "../../hooks/useInquery.js";

import {
  ActiveBar,
  Avatar,
  Column,
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
import { formatDateTime } from "../../utils/formatDate.js";

import InqueryDetails from "./InqueryDetails.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import Sort from "../ui/Sort.jsx";
import SearchBar from "../SearchBar.jsx";
import Pagination from "../Pagination.jsx";

const TABS = [
  { value: "ALL", label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "RESPONDED", label: "Responded" },
  { value: "CLOSED", label: "Closed" },
];

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest first" },
  { value: "createdAt:asc", label: "Oldest first" },
  { value: "senderName:asc", label: "Sender A-Z" },
  { value: "shipName:asc", label: "Vessel A-Z" },
];

function InqueryList() {
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);

  const [sortBy, order] = sort.split(":");

  const { data, isLoading, isError } = useGetMyInqueries({
    search,
    status: status === "ALL" ? undefined : status,
    sortBy,
    order,
    page,
  });

  const { mutate } = useUpdateStatusInquery();

  const items = data?.items ?? [];
  const counts = data?.counts;

  const current = items.find((i) => i.id === selected?.id) ?? selected;
  const hasFilters = Boolean(search) || status !== "ALL";
  const mapSort = SORT_OPTIONS.map((s) => ({
    value: s.value,
    name: s.label,
  }));

  useEffect(() => {
    setPage(1);
  }, [status, sort, search]);

  const countFor = (tab) => {
    if (!counts) return undefined;
    return tab === "ALL" ? counts.OPEN + counts.RESPONDED + counts.CLOSED : counts[tab];
  };

  const handleStatusChange = (next) => {
    if (!current) return;

    mutate({ status: next, id: current.id });
    setSelected((prev) => (prev ? { ...prev, status: next } : prev));
  };

  const handleSort = (value) => {
    setSort(value);
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

        <Column>
          <SearchBar value={search} onChange={setSearch} />
          <Sort items={mapSort} value={sort} onChange={handleSort} />
        </Column>
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
                            <ItemTime dateTime={formatDateTime(inquiry.createdAt)}>{formatDateTime(inquiry.createdAt)}</ItemTime>
                          </ItemTop>

                          <ItemShip>{inquiry.ship.shipName}</ItemShip>
                          <ItemPreview>
                            Subject:<strong> {inquiry.subject}</strong>
                          </ItemPreview>
                          <ItemPreview>{inquiry.message}</ItemPreview>

                          <ItemBadge>
                            <BadgeStatus $status={inquiry.status} />
                          </ItemBadge>
                        </ItemBody>

                        {isOpen && <UnreadDot role='img' aria-label='Open' />}
                      </ItemButton>
                    </li>
                  );
                })}
              </List>
            )}
          </ListScroll>
          <Pagination count={data?.total} totalPages={data?.totalPages} page={data?.page} limit={data?.limit} onPageChange={setPage} />
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

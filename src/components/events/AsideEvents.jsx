import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getRecentEvents } from "../../services/apiEvents.js";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

import { customFormatDate } from "../../utils/formatDate.js";

const Aside = styled.aside`
  margin-top: 4rem;
  height: auto;
  background: var(--color-grey-0);
  border-radius: 12px;
  padding: 1rem;
`;

const List = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Card = styled.article`
  background-color: ${({ $priority }) => {
    switch ($priority) {
      case "HIGH":
        return "#ef4444";
      case "MEDIUM":
        return "#facc15";
      case "LOW":
        return "#51cab2";
      default:
        return "#d1d5db";
    }
  }};
  padding: 1rem;
  border-radius: var(--border-radius-md);
  color: ${({ $priority }) => ($priority === "HIGH" ? "#fff" : "#000")};
`;

const CardTitle = styled.h4`
  font-size: 1.2rem;
`;

const CardDate = styled.p`
  font-size: 1rem;
`;

const AsideEvents = () => {
  const [dates, setDates] = useState([null, null]);
  const [startDate, endDate] = dates;

  const payload = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["recent-events", payload],
    queryFn: () => getRecentEvents(payload),
  });

  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <Aside>
      <h3>Recent events</h3>

      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDates(update);
        }}
        isClearable
        selected={startDate}
        dateFormat='dd.MM.yyyy'
        calendarClassName='custom-calendar'
        minDate={new Date()}
        placeholderText={customFormatDate(new Date())}
        monthsShown={2}
        withPortal
      />

      {data && (
        <List>
          {data?.map((event) => (
            <Card key={event.id} $priority={event.priority}>
              <CardTitle>{event.title}</CardTitle>
              <CardDate>Start at {customFormatDate(event.start)}</CardDate>
              <CardDate>End at {customFormatDate(event.end)}</CardDate>
            </Card>
          ))}
        </List>
      )}
    </Aside>
  );
};

export default AsideEvents;

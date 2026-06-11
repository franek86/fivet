import { useCallback, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styled from "styled-components";

import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CustomBigCalendarView from "./CustomBigCalendarView.jsx";
import CustomBigCalendarEdit from "./CustomBigCalendarEdit.jsx";

import { useGetAllEvents } from "../../hooks/useEvents.js";

import { EVENT_COLORS } from "../../constants/index.js";
import CutomWeekendCalendar from "./CutomWeekendCalendar.jsx";
import CustomBigCalendarHours from "./CustomBigCalendarHours.jsx";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;

  @media screen and (min-width: 640px) {
    flex-direction: row;
    gap: 0;
  }

  .info {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
  }

  .button-group {
    display: flex;
    gap: 8px;
    font-size: 12px;
    color: var(--color-text);
    font-weight: 600;
    background-color: var(--color-white);
    border-radius: var(--border-radius-lg);
  }

  .arrows {
    padding: 6px 10px;
  }

  .tabs {
    .tab {
      padding: 6px 10px;

      &.active {
        background-color: var(--color-accent);
      }
    }
  }
`;

const StyledLayout = styled.div`
  .calendar-body {
    margin: 3rem 0;
    background-color: var(--color-white);
    border-radius: var(--border-radius-lg);

    @media screen and (min-width: 640px) {
      padding: 3rem;
    }

    .week-wrapper {
      .hours-wrapper {
        margin-top: 2rem;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      .cell {
        text-align: center;
        color: var(--color-text);
        background: var(--color-white);
        border-bottom: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);

        min-height: 110px;
        padding: 8px 6px 6px;
        cursor: pointer;

        .date {
          font-size: 16px;
          //font-weight: 600;
        }
        .day {
          font-size: 13px;
          color: var(--color-text-muted);
        }
      }

      .cell:hover,
      .today {
        background: var(--color-accent);
      }

      .muted {
        background-color: var(--color-grey-200);
      }
    }
  }
`;

const TABS = {
  MONTH: "month",
  WEEK: "week",
  DAY: "day",
};

const tabs = [
  { key: TABS.MONTH, label: "Month" },
  { key: TABS.WEEK, label: "Week" },
  { key: TABS.DAY, label: "Day" },
];

const getSpanClass = (day, start, end) => {
  if (isSameDay(day, start) && isSameDay(day, end)) {
    return "span-single";
  }

  if (isSameDay(day, start)) {
    return "span-start";
  }

  if (isSameDay(day, end)) {
    return "span-end";
  }

  return "span-mid";
};

const CustomBigCalendar = () => {
  const { data, isLoading } = useGetAllEvents();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(TABS.WEEK);
  const [viewEvent, setViewEvent] = useState(null);
  const [formState, setFormState] = useState(null);

  const events = useMemo(() => {
    return (data?.events ?? []).map((event) => ({
      ...event,
      startDate: parseISO(event.start),
      endDate: parseISO(event.end),
    }));
  }, [data]);

  const navigateDate = (direction) => {
    const map = {
      [TABS.MONTH]: addMonths,
      [TABS.WEEK]: addWeeks,
      [TABS.DAY]: addDays,
    };

    setCurrentDate((prev) => map[view](prev, direction));
  };

  const handlePrev = () => navigateDate(-1);

  const handleNext = () => navigateDate(1);

  const handleToday = () => setCurrentDate(new Date());

  const openAdd = (dk) =>
    setFormState({ mode: "add", event: { title: "", start: dk, end: dk, priority: "", description: "", location: "", status: "" } });
  const openEdit = (e, ev) => {
    ev.stopPropagation();
    setFormState({ mode: "edit", event: { ...e } });
    setViewEvent(null);
  };
  const openView = (e, ev) => {
    ev.stopPropagation();
    setViewEvent(e);
  };

  const monthDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentDate, { weekStartsOn: 1 })),
      end: endOfWeek(endOfMonth(currentDate, { weekStartsOn: 1 })),
    });
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(currentDate, { weekStartsOn: 1 }),
      end: endOfWeek(currentDate, { weekStartsOn: 1 }),
    });
  }, [currentDate]);

  const getEventsForDay = useCallback(
    (day) => {
      return events.filter((event) =>
        isWithinInterval(day, {
          start: startOfDay(event.startDate),
          end: endOfDay(event.endDate),
        }),
      );
    },
    [events],
  );

  const renderBars = (day) => {
    const events = getEventsForDay(day);
    const visibleEvents = events.slice(0, 3);
    const hiddenCount = events.length - visibleEvents.length;

    return (
      <>
        {visibleEvents.map((event) => {
          const start = parseISO(event.start);
          const end = parseISO(event.end);

          const spanClass = getSpanClass(day, start, end);
          const showTitle = spanClass === "span-single" || spanClass === "span-start";

          return (
            <div
              key={event.id}
              className={`event-bar ${spanClass}`}
              style={{ background: EVENT_COLORS[event.priority]?.bg ?? "#4a7fb5" }}
              onClick={(e) => openView(event, e)}
            >
              {showTitle ? event.title : "\u00a0"}
            </div>
          );
        })}

        {hiddenCount > 0 && <div className='more-dot'>+{hiddenCount} more</div>}
      </>
    );
  };

  if (isLoading) return <TablePlaceholder count={6} />;

  return (
    <>
      <Header>
        <div className='arrows button-group'>
          <div onClick={handleToday}>Today</div>
          <div onClick={handlePrev}>Prev</div>
          <div onClick={handleNext}>Next</div>
        </div>
        <div className='info'>
          {view === TABS.DAY && format(currentDate, "MMM dd, yyyy")}
          {view === TABS.MONTH && format(currentDate, "MMMM yyyy")}
          {view === TABS.WEEK && `Week of ${format(currentDate, "MMM dd, yyyy")}`}
        </div>
        <div className='tabs button-group'>
          {tabs.map((tab) => (
            <div key={tab.key} onClick={() => setView(tab.key)} className={view === tab.key ? "tab active" : "tab"}>
              {tab.label}
            </div>
          ))}
        </div>
      </Header>

      <StyledLayout>
        <div className='calendar-body'>
          {view === TABS.MONTH && (
            <div className='grid'>
              {monthDays.map((day) => (
                <div
                  key={day.toString()}
                  className={`cell ${!isSameMonth(day, currentDate) ? "muted" : ""} ${isToday(day) ? "today" : ""}`}
                  onClick={() => openAdd(day)}
                >
                  <div className='date'>{format(day, "d")}</div>

                  {renderBars(day)}
                </div>
              ))}
            </div>
          )}

          {view === TABS.WEEK && (
            <>
              <CutomWeekendCalendar weekDays={weekDays} events={events} openView={openView} openAdd={openAdd} openEdit={openEdit} />
            </>
          )}

          {view === TABS.DAY && (
            <>
              <CustomBigCalendarHours day={currentDate} events={events} openView={openView} openAdd={openAdd} />
            </>
          )}
        </div>
      </StyledLayout>

      {viewEvent && <CustomBigCalendarView viewEvent={viewEvent} setViewEvent={setViewEvent} openEdit={openEdit} />}
      {formState && <CustomBigCalendarEdit formState={formState} setFormState={setFormState} />}
    </>
  );
};

export default CustomBigCalendar;

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styled from "styled-components";
import { useGetAllEvents } from "../../hooks/useEvents.js";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;

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
    padding: 3rem;
    border-radius: var(--border-radius-lg);

    .week-wrapper {
      .hours-wrapper {
        margin-top: 2rem;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;

      &.week {
        grid-template-columns: 90px repeat(7, 1fr);
      }

      .cell {
        text-align: center;
        color: var(--color-text);
        background: var(--color-white);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-lg);
        min-height: 90px;
        padding: 6px;
        cursor: pointer;

        .date {
          font-weight: 600;
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

const HoursSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 0.3rem;
  background-color: var(--color-grey-200);
  .time-col {
    width: 90px;
    font-weight: 600;
    padding: 0.5rem;
    text-align: center;
  }

  .hours-col {
    display: grid;
    gap: 10px;
    flex: 1;
    grid-template-columns: repeat(7, 1fr);

    &.today-col {
      background: var(--color-accent);
    }
    .hours-cell {
      border: 1px solid var(--color-border);
      &.today {
        background: var(--color-accent);
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

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const CustomBigCalendar = () => {
  const { data, isLoading } = useGetAllEvents();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(TABS.WEEK);

  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const handlePrev = () => {
    if (view === TABS.MONTH) setCurrentDate((d) => addMonths(d, -1));
    if (view === TABS.WEEK) setCurrentDate((d) => addWeeks(d, -1));
    if (view === TABS.DAY) setCurrentDate((d) => addDays(d, -1));
  };

  const handleNext = () => {
    if (view === TABS.MONTH) setCurrentDate((d) => addMonths(d, 1));
    if (view === TABS.WEEK) setCurrentDate((d) => addWeeks(d, 1));
    if (view === TABS.DAY) setCurrentDate((d) => addDays(d, 1));
  };

  const handleToday = () => {
    if (view === TABS.MONTH) setCurrentDate(new Date());
    if (view === TABS.WEEK) setCurrentDate(new Date());
    if (view === TABS.DAY) setCurrentDate(new Date());
  };

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getEventsForDay = (day) => {
    return (data?.events || []).filter((e) => isSameDay(parseISO(e.start), day));
  };

  const hasEventInDay = (day) => {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    return (data?.events ?? []).some((e) => {
      const start = parseISO(e.start);
      const end = parseISO(e.end);

      return start <= endOfDay && end >= startOfDay;
    });
  };

  const getEventsForHoursCell = (day, hour) => {
    return (data?.events || []).filter((e) => isSameDay(parseISO(e.start), day) && parseISO(e.start).getHours() === hour);
  };

  const HoursCell = ({ isWeek }) => {
    return HOURS.map((hour) => (
      <HoursSection key={hour}>
        <div className='time-col'>{hour}:00</div>

        <div className={`hours-col ${!isWeek ? "today-col" : ""} `}>
          {isWeek ? (
            weekDays.map((day) => (
              <div key={day.toString() + hour} className={`hours-cell ${isToday(day) ? "today" : ""}`} onClick={() => addEvent(day, hour)}>
                {getEventsForHoursCell(day, hour).map((ev) => (
                  <div key={ev.id} className='event'>
                    {ev.title}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className='today' onClick={() => addEvent(hour)}>
              {getEventsForHoursCell(currentDate, hour).map((ev) => (
                <div key={ev.id} className='event'>
                  {ev.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </HoursSection>
    ));
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
                >
                  <div className='date'>{format(day, "EE")}</div>
                  <div className='day-number'>{format(day, "MMMM d")}</div>

                  {getEventsForDay(day).map((ev) => (
                    <div key={ev.id} className='event'>
                      {ev.title} <button onClick={() => deleteEvent(ev.id)}>x</button>{" "}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {view === TABS.WEEK && (
            <div className='week-wrapper'>
              <div className='grid week'>
                <div></div>
                {weekDays.map((day) => (
                  <div key={day.toString()} className={`cell ${isToday(day) ? "today" : ""}`}>
                    <div className='date'>{format(day, "EEEE")}</div>
                    <div className='day-number'>{format(day, "MMMM d")}</div>

                    {getEventsForDay(day).map((ev) => (
                      <div key={ev.id} className='event'>
                        {ev.title} <button onClick={() => deleteEvent(ev.id)}>x</button>{" "}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className='hours-wrapper'>
                <HoursCell isWeek />
              </div>
            </div>
          )}

          {view === TABS.DAY && (
            <div>
              <HoursCell isWeek={false} />
            </div>
          )}
        </div>
      </StyledLayout>
    </>
  );
};

export default CustomBigCalendar;

import { eachDayOfInterval, endOfDay, format, isSameDay, isToday, setHours, startOfDay } from "date-fns";
import styled from "styled-components";
import { EVENT_COLORS } from "../../constants/index.js";
import { groupOverlappingEvents } from "../../helpers/overLapCalendarEvents.js";
import { ClockIcon } from "lucide-react";

const WeekCalendar = styled.div`
  position: relative;
  overflow: hidden;
  background: var(--color-white);

  .header {
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    border-bottom: 1px solid var(--color-border);
  }

  .header-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--color-border);
    padding: 2.5rem 0;

    .date {
      font-size: 16px;
      font-weight: 600;
    }
    .day {
      font-size: 13px;
      color: var(--color-text-muted);
    }
  }

  .body {
    position: relative;
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    height: 2400px;
  }

  .time-column {
    position: relative;
  }

  .time-slot {
    text-align: center;
    height: 100px;
    font-size: 13px;
    color: var(--color-text-muted);
    padding: 4px;
  }

  .day-column {
    position: relative;
    border-left: 1px solid var(--color-border);
  }

  .hour-line {
    height: 100px;
    border-bottom: 1px solid var(--color-border);
  }

  .event {
    position: absolute;
    border-radius: 10px;
    padding: 6px 8px;
    font-size: 12px;
    overflow: hidden;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .event-title {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .event-time {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 11px;
    color: var(--colot-text-muted);
  }
`;

const MINUTE_HEIGHT = 100 / 60;
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const getEventPosition = (start, end) => {
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();

  // endOfDay gives 23:59:59 — treat that as midnight (1440 min)
  const clampedEnd = endMinutes === 0 && end.getSeconds() === 59 ? 1440 : endMinutes;

  return {
    top: startMinutes * MINUTE_HEIGHT,
    height: Math.max((clampedEnd - startMinutes) * MINUTE_HEIGHT, 20),
  };
};

const CutomWeekendCalendar = ({ weekDays, events, openAdd }) => {
  const positionedEvents = groupOverlappingEvents(events);
  const allSegments = positionedEvents;

  return (
    <WeekCalendar>
      <div className='header'>
        <div className='header-cell' />
        {weekDays.map((day) => (
          <div key={day.toString()} className={`header-cell ${isToday(day) ? "today" : ""}`}>
            <div className='date'>{format(day, "d")}</div>
            <div className='day'>{format(day, "EEEE")}</div>
          </div>
        ))}
      </div>

      <div className='body'>
        <div className='time-column'>
          {HOURS.map((hour) => (
            <div key={hour} className='time-slot'>
              {format(setHours(new Date(), hour), "hh aa")}
            </div>
          ))}
        </div>

        {weekDays.map((day) => {
          const daySegments = allSegments.filter((seg) => isSameDay(seg.day, day));

          return (
            <div key={day.toString()} className='day-column' onClick={() => openAdd(day)}>
              {HOURS.map((hour) => (
                <div key={hour} className='hour-line' />
              ))}

              {daySegments.map((seg) => {
                // Pass segmentStart/segmentEnd — not the original start/end
                const { top, height } = getEventPosition(seg.segmentStart, seg.segmentEnd);
                const totalCols = seg.totalColumns ?? 1;
                const col = seg.column ?? 0;
                const width = 100 / totalCols;

                const timeLabel = `${format(new Date(seg.start), "hh aa")} – ${format(new Date(seg.end), "hh aa")}`;
                const showTime = height >= 36;

                return (
                  <div
                    key={`${seg.id}-${format(day, "yyyy-MM-dd")}`}
                    className='event'
                    style={{
                      top,
                      height,
                      left: `calc(${col * width}% + 2px)`,
                      width: `calc(${width}% - 4px)`,
                      background: EVENT_COLORS[seg.priority]?.bg ?? "#4a7fb5",
                    }}
                  >
                    <span className='event-title'>{seg.title}</span>
                    {showTime && (
                      <span className='event-time'>
                        <ClockIcon size={12} />
                        {timeLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </WeekCalendar>
  );
};

export default CutomWeekendCalendar;

import React from "react";
import { getEventPosition } from "../../helpers/getPositionEventCalendar.js";
import { format, isSameDay, setHours } from "date-fns";
import { ClockIcon } from "lucide-react";
import { EVENT_COLORS, HOURS } from "../../constants/index.js";
import { groupOverlappingEvents } from "../../helpers/overLapCalendarEvents.js";

const CustomBigCalendarHours = ({ events, day, openAdd }) => {
  const positionedEvents = groupOverlappingEvents(events);
  const allSegments = positionedEvents;
  const daySegments = allSegments.filter((seg) => isSameDay(seg.day, day));
  return (
    <div className='week-calendar'>
      <div className='body time'>
        <div className='time-column'>
          {HOURS.map((hour) => (
            <div key={hour} className='time-slot'>
              {format(setHours(new Date(), hour), "hh aa")}
            </div>
          ))}
        </div>
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
                onClick={(e) => openView(seg, e)}
                style={{
                  top,
                  height,
                  left: `calc(${col * width}% + 2px)`,
                  width: `calc(${width}% - 4px)`,
                  background: EVENT_COLORS[seg.priority]?.bg ?? "#4a7fb5",
                  color: EVENT_COLORS[seg.priority]?.text ?? "#000",
                  borderTopLeftRadius: seg.isFirst ? 10 : 0,
                  borderTopRightRadius: seg.isFirst ? 10 : 0,
                  borderBottomLeftRadius: seg.isLast ? 10 : 0,
                  borderBottomRightRadius: seg.isLast ? 10 : 0,
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
      </div>
    </div>
  );
};

export default CustomBigCalendarHours;

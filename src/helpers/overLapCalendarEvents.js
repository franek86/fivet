import { eachDayOfInterval, isSameDay, startOfDay, endOfDay } from "date-fns";

// Split a single event into per-day segments first
const splitEventByDay = (event) => {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const days = eachDayOfInterval({
    start: startOfDay(start),
    end: startOfDay(end),
  });

  return days.map((day) => {
    const isFirst = isSameDay(day, start);
    const isLast = isSameDay(day, end);

    return {
      ...event,
      segmentStart: isFirst ? start : startOfDay(day),
      segmentEnd: isLast ? end : endOfDay(day),
      day,
      isFirst,
      isLast,
    };
  });
};

export const groupOverlappingEvents = (events) => {
  if (!events.length) return [];

  // 1. Split all events into day segments FIRST
  const segments = events.flatMap(splitEventByDay);

  // 2. Group segments by day
  const byDay = {};
  segments.forEach((seg) => {
    const key = seg.day.toISOString().slice(0, 10);
    if (!byDay[key]) byDay[key] = [];
    byDay[key].push(seg);
  });

  const result = [];

  // 3. For each day, find overlapping clusters and assign columns
  Object.values(byDay).forEach((daySegments) => {
    const sorted = [...daySegments].sort((a, b) => new Date(a.segmentStart) - new Date(b.segmentStart));

    // Find clusters of mutually-overlapping segments
    const clusters = [];

    sorted.forEach((seg) => {
      const segStart = new Date(seg.segmentStart);
      const segEnd = new Date(seg.segmentEnd);

      // Find an existing cluster this segment overlaps with
      let placed = false;
      for (const cluster of clusters) {
        const overlapsCluster = cluster.some((s) => {
          return segStart < new Date(s.segmentEnd) && segEnd > new Date(s.segmentStart);
        });

        if (overlapsCluster) {
          cluster.push(seg);
          placed = true;
          break;
        }
      }

      if (!placed) clusters.push([seg]);
    });

    // Assign columns within each cluster
    clusters.forEach((cluster) => {
      const columns = []; // columns[i] = last segmentEnd time in that column

      const positioned = cluster.map((seg) => {
        const segStart = new Date(seg.segmentStart);
        const segEnd = new Date(seg.segmentEnd);

        // Find the first column where this segment fits
        let col = columns.findIndex((colEnd) => segStart >= colEnd);

        if (col === -1) {
          col = columns.length; // need a new column
        }

        columns[col] = segEnd;

        return { ...seg, column: col };
      });

      const totalColumns = columns.length;

      positioned.forEach((seg) => {
        result.push({ ...seg, totalColumns });
      });
    });
  });

  return result;
};

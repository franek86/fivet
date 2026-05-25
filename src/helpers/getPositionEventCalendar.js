import { MINUTE_HEIGHT } from "../constants/index.js";

export const getEventPosition = (start, end) => {
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();

  // endOfDay gives 23:59:59 — treat that as midnight (1440 min)
  const clampedEnd = endMinutes === 0 && end.getSeconds() === 59 ? 1440 : endMinutes;

  return {
    top: startMinutes * MINUTE_HEIGHT,
    height: Math.max((clampedEnd - startMinutes) * MINUTE_HEIGHT, 20),
  };
};

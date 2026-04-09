import moment from "moment";

/**
 * Converts a duration in minutes into a human-readable string.
 * Rules:
 * - Less than 60 minutes: show in minutes (e.g., "45min")
 * - Less than 24 hours: show in hours (e.g., "5h")
 * - 24 hours or more: show in days (e.g., "2d")
 *
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatMinutes = (minutes) => {
  const duration = moment.duration(minutes, "minutes");

  if (minutes < 60) {
    return `${minutes}min`;
  } else if (minutes < 1440) {
    return `${Math.floor(duration.asHours())}h`;
  } else {
    return `${Math.floor(duration.asDays())} d`;
  }
};

import { format } from "date-fns";

/**
 * Formats a date into "dd.MM.yyyy" format.
 * Example:
 *  customFormatDate("2026-04-09") -> "09.04.2026"
 * @param {string|Date|number} date - Input date (string, Date object, or timestamp)
 * @returns {string} Formatted date string in "dd.MM.yyyy" format
 */
export const customFormatDate = (date) => {
  return format(new Date(date), "dd.MM.yyyy");
};

/**
 * Formats a date into "yyyy-MM-dd" format suitable for URLs or APIs.
 * Example:
 *  urlFormatDate("2026-04-09") -> "2026-04-09"
 * @param {string|Date|number} date - Input date (string, Date object, or timestamp)
 * @returns {string} Formatted date string in "yyyy-MM-dd" format
 */
export const urlFormatDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

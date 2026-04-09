/**
 * Returns the abbreviated month name for a given month index.
 *
 * Example:
 *  formatMonth(0, "en-US") -> "Jan"
 *  formatMonth(5, "fr-FR") -> "juin"
 *
 * @param {number} monthIndex - Zero-based index of the month (0 = January, 11 = December)
 * @param {string} [locale="en-US"] - Optional locale string for formatting
 * @returns {string} Abbreviated month name
 */

export const formatMonth = (monthIndex, locale) =>
  new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, monthIndex, 1));

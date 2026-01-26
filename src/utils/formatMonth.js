export const formatMonth = (monthIndex, locale) =>
  new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, monthIndex, 1));

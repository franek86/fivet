import { format } from "date-fns";

export const customFormatDate = (date) => {
  return format(new Date(date), "dd.MM.yyyy");
};

export const urlFormatDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

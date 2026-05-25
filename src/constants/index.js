export const PAGE_SIZE = 10;
export const MAX_PAGE_BUTTONS = 2;
export const EVENT_STATUS = [
  { value: "PLANNED", name: "Planned" },
  { value: "DONE", name: "Done" },
  { value: "CANCELLED", name: "Cancelled" },
];
export const EVENT_PRIORITY = [
  { value: "LOW", name: "Low" },
  { value: "MEDIUM", name: "Medium" },
  { value: "HIGH", name: "High" },
];

export const EVENT_REMINDER = [
  { value: 5, name: "5 minute before" },
  { value: 15, name: "15 minute before" },
  { value: 30, name: "30 minute before" },
  { value: 60, name: "1 hour before" },
  { value: 1440, name: "1 day before" },
];

export const BLOG_STATUS = [
  { value: "DRAFT", name: "Draft" },
  { value: "PUBLISHED", name: "Published" },
  { value: "ARCHIVED", name: "Archived" },
];

export const BLOG_CATEGORIES = [
  { value: 1, name: "Blog" },
  { value: 2, name: "News" },
  { value: 3, name: "Tankers" },
  { value: 4, name: "Vessels" },
];

export const EVENT_COLORS = {
  LOW: {
    bg: "#51cab2",
  },

  MEDIUM: {
    bg: "#facc15",
  },

  HIGH: {
    bg: "#ffb29f",
  },
};

export const MINUTE_HEIGHT = 100 / 60;
export const HOURS = Array.from({ length: 24 }, (_, i) => i);

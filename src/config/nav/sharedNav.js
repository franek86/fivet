import { BellPlus, CalendarRange, Contact } from "lucide-react";

export const sharedNav = [
  { href: "/events", label: "Events", icon: CalendarRange, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
  { href: "/address-book", label: "Address book", icon: Contact, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"], plan: "PREMIUM" },
  { href: "/notifications", label: "Notifications", icon: BellPlus, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
];

import { BellPlus, CalendarRange, Contact, Settings } from "lucide-react";

export const sharedNav = [
  { href: "/events", label: "Events", icon: CalendarRange, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
  { href: "/address-book", label: "Address book", icon: Contact, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"], plan: "PREMIUM" },
  { href: "/notifications", label: "Notifications", icon: BellPlus, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
  { href: "/settings", label: "Settings", icon: Settings, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
];

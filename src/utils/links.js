import { BellPlus, Blocks, CalendarRange, Contact, CreditCard, LayoutDashboard, Ship, UserPen, Users } from "lucide-react";

export const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, allowRoles: ["ADMIN", "USER"] },
  { href: "/ships", label: "Ships", icon: Ship, allowRoles: ["ADMIN", "USER"] },
  { href: "/categories", label: "Categories", icon: Blocks, allowRoles: ["ADMIN"] },
  { href: "/users", label: "Users", icon: Users, allowRoles: ["ADMIN"] },
  { href: "/events", label: "Events", icon: CalendarRange, allowRoles: ["ADMIN"] },
  { href: "/address-book", label: "Address book", icon: Contact, allowRoles: ["ADMIN", "USER"], plan: "PREMIUM" },
  { href: "/profile", label: "Profile", icon: UserPen, allowRoles: ["ADMIN", "USER"] },
  { href: "/payments", label: "Payments", icon: CreditCard, allowRoles: ["ADMIN"] },
  { href: "/notifications", label: "Notifications", icon: BellPlus, allowRoles: ["ADMIN", "USER"] },
];

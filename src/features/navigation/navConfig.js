import { BellPlus, Blocks, CalendarRange, Contact, CreditCard, Globe, TrendingUp, Ship, Users } from "lucide-react";

export const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp, allowRoles: ["ADMIN"] },
  { href: "/user/dashboard", label: "Dashboard", icon: TrendingUp, allowRoles: ["USER"] },
  { href: "/ships", label: "Ships", icon: Ship, allowRoles: ["ADMIN", "USER"] },
  { href: "/categories", label: "Categories", icon: Blocks, allowRoles: ["ADMIN"] },
  { href: "/users", label: "Users", icon: Users, badge: "onlineCount", allowRoles: ["ADMIN"] },
  { href: "/events", label: "Events", icon: CalendarRange, allowRoles: ["ADMIN", "USER"] },
  { href: "/address-book", label: "Address book", icon: Contact, allowRoles: ["ADMIN", "USER"], plan: "PREMIUM" },
  { href: "/payments", label: "Payments", icon: CreditCard, allowRoles: ["ADMIN"] },
  { href: "/notifications", label: "Notifications", icon: BellPlus, allowRoles: ["ADMIN", "USER"] },
  {
    label: "Blog",
    icon: Globe,
    allowRoles: ["ADMIN"],
    children: [
      { id: "add", label: "Add Blog", href: "blogs/create" },
      { id: "blogs", label: "All Blogs", href: "blogs" },
      { id: "blogs-category", label: "Blog category", href: "blogs/category" },
    ],
  },
];

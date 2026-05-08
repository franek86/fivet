import { BellPlus, Blocks, CalendarRange, Contact, CreditCard, Globe, LayoutDashboard, Ship, UserPen, Users } from "lucide-react";

export const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, allowRoles: ["ADMIN"] },
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard, allowRoles: ["USER"] },
  { href: "/ships", label: "Ships", icon: Ship, allowRoles: ["ADMIN", "USER"] },
  { href: "/categories", label: "Categories", icon: Blocks, allowRoles: ["ADMIN"] },
  { href: "/users", label: "Users", icon: Users, badgeKey: "activeUsers", allowRoles: ["ADMIN"] },
  { href: "/events", label: "Events", icon: CalendarRange, allowRoles: ["ADMIN", "USER"] },
  { href: "/address-book", label: "Address book", icon: Contact, allowRoles: ["ADMIN", "USER"], plan: "PREMIUM" },
  { href: "/payments", label: "Payments", icon: CreditCard, allowRoles: ["ADMIN"] },
  { href: "/notifications", label: "Notifications", icon: BellPlus, allowRoles: ["ADMIN", "USER"] },
  {
    label: "Blog",
    icon: Globe,
    allowRoles: ["ADMIN"],
    children: [
      { id: "add", label: "Add Blog", href: "blog/create" },
      { id: "blogs", label: "All Blogs", href: "blog/list" },
      { id: "blogs-category", label: "Blog category", href: "blog/category" },
    ],
  },
];

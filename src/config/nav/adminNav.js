import { TrendingUp, Users, Blocks, CreditCard, Globe, Ship } from "lucide-react";

export const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/vessels", label: "Vessels", icon: Ship },
  { href: "/admin/categories", label: "Categories", icon: Blocks },
  { href: "/admin/users", label: "Users", icon: Users, badgeKey: "admin.onlineCount" },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  {
    label: "Blog",
    icon: Globe,
    children: [
      { label: "Add Blog", href: "/admin/blogs/create" },
      { label: "All Blogs", href: "/admin/blogs" },
      { label: "Blog category", href: "/admin/blogs/category" },
    ],
  },
];

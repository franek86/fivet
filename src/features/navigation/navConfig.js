import {
  BellPlus,
  Blocks,
  CalendarRange,
  Contact,
  CreditCard,
  Globe,
  TrendingUp,
  Ship,
  Users,
  Settings,
  MessageSquare,
  Search,
  Bookmark,
  SearchIcon,
  Bot,
  File,
  BadgeCheck,
  UserPen,
  Handshake,
  ClipboardCheck,
} from "lucide-react";

export const navLinks = [
  // Dashboards (one entry per role, only one ever matches the logged-in user)
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp, allowRoles: ["ADMIN"] },
  { href: "/broker/dashboard", label: "Dashboard", icon: TrendingUp, allowRoles: ["BROKER"] },
  { href: "/owner/dashboard", label: "Dashboard", icon: TrendingUp, allowRoles: ["OWNER"] },

  // Admin
  { href: "/admin/vessels", label: "Vessels", icon: Ship, allowRoles: ["ADMIN"] },
  { href: "/admin/categories", label: "Categories", icon: Blocks, allowRoles: ["ADMIN"] },
  { href: "/admin/users", label: "Users", icon: Users, badge: "onlineCount", allowRoles: ["ADMIN"] },

  {
    label: "Blog",
    icon: Globe,
    allowRoles: ["ADMIN"],
    children: [
      { id: "add", label: "Add Blog", href: "/admin/blogs/create" },
      { id: "blogs", label: "All Blogs", href: "/admin/blogs" },
      { id: "blogs-category", label: "Blog category", href: "/admin/blogs/category" },
    ],
  },
  { href: "/admin/payments", label: "Payments", icon: CreditCard, allowRoles: ["ADMIN"] },

  // Broker
  { href: "/broker/vessels", label: "My Vessels", icon: Ship, allowRoles: ["BROKER"] },
  { href: "/broker/enquiries", label: "Enquiries", icon: MessageSquare, allowRoles: ["BROKER"] },
  { href: "/broker/buyers", label: "Buyers", icon: Users, allowRoles: ["BROKER"] },
  { href: "/broker/find-owner", label: "Find owner", icon: SearchIcon, allowRoles: ["BROKER"] },
  { href: "/broker/messages", label: "Messages", icon: Bot, allowRoles: ["BROKER"] },
  { href: "/broker/documents", label: "Documents", icon: File, allowRoles: ["BROKER"] },
  { href: "/broker/verification", label: "Verification", icon: BadgeCheck, allowRoles: ["BROKER"] },
  { href: "/broker/profile", label: "Profile", icon: UserPen, allowRoles: ["BROKER"] },

  // Owner
  { href: "/owner/vessels", label: "My Vessels", icon: Ship, allowRoles: ["OWNER"] },
  { href: "/owner/brokers", label: "Brokers", icon: Handshake, allowRoles: ["OWNER"] },
  { href: "/owner/listing-approvals", label: "Listing Approvals", icon: ClipboardCheck, allowRoles: ["OWNER"] },

  // Buyer
  { href: "/buyer/vessels", label: "Browse Vessels", icon: Search, allowRoles: ["BUYER"] },
  { href: "/buyer/saved-vessels", label: "Saved Vessels", icon: Bookmark, allowRoles: ["BUYER"], plan: "PREMIUM" },
  { href: "/buyer/enquiries", label: "Enquiries", icon: MessageSquare, allowRoles: ["BUYER"] },
  { href: "/buyer/address-book", label: "Address book", icon: Contact, allowRoles: ["BUYER"], plan: "PREMIUM" },

  // Shared across all roles
  { href: "/events", label: "Events", icon: CalendarRange, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
  { href: "/address-book", label: "Address book", icon: Contact, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"], plan: "PREMIUM" },
  { href: "/notifications", label: "Notifications", icon: BellPlus, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
  { href: "/settings", label: "Settings", icon: Settings, allowRoles: ["ADMIN", "BROKER", "OWNER", "BUYER"] },
];

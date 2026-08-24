import { Bookmark, Contact, MessageSquare, Search, TrendingUp } from "lucide-react";

export const buyerNav = [
  { href: "/buyer/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/buyer/vessels", label: "Browse Vessels", icon: Search, allowRoles: ["BUYER"] },
  { href: "/buyer/saved-vessels", label: "Saved Vessels", icon: Bookmark, allowRoles: ["BUYER"], plan: "PREMIUM" },
  { href: "/buyer/enquiries", label: "Enquiries", icon: MessageSquare, allowRoles: ["BUYER"] },
  { href: "/buyer/address-book", label: "Address book", icon: Contact, allowRoles: ["BUYER"], plan: "PREMIUM" },
];

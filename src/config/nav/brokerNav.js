import { TrendingUp, Ship, Search, Users, MessageSquare, FileText, ShieldCheck, Building2 } from "lucide-react";

export const brokerNav = [
  { href: "/broker/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/broker/vessels", label: "My Vessels", icon: Ship },
  { href: "/broker/find-owners", label: "Find Owners", icon: Search },
  { href: "/broker/buyers", label: "Buyers", icon: Users },
  { href: "/broker/enquiries", label: "Enquiries", icon: MessageSquare, badgeKey: "broker.enquiries.new" },
  { href: "/broker/messages", label: "Messages", icon: MessageSquare, badgeKey: "broker.messages.unread" },
  { href: "/broker/documents", label: "Documents", icon: FileText },
  { href: "/broker/verification", label: "Verification", icon: ShieldCheck },
  { href: "/broker/profile", label: "Company Profile", icon: Building2 },
];

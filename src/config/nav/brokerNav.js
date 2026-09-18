import { TrendingUp, Ship, Search, FileText, Building2, MailQuestion, MessageCircleMore } from "lucide-react";

export const brokerNav = [
  { href: "/broker/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/broker/vessels", label: "My Vessels", icon: Ship },
  { href: "/broker/find-owners", label: "Find Owners", icon: Search },
  { href: "/broker/enquiries", label: "Enquiries", icon: MailQuestion, badgeKey: "broker.enquiries.new" },
  { href: "/broker/chat", label: "Chat", icon: MessageCircleMore, badgeKey: "broker.messages.unread" },
  { href: "/broker/documents", label: "Documents", icon: FileText },
  { href: "/broker/profile", label: "Company Profile", icon: Building2 },
];

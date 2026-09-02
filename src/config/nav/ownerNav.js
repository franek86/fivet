import { Building2, ClipboardCheck, Handshake, Ship, TrendingUp } from "lucide-react";

export const ownerNav = [
  { href: "/owner/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/owner/vessels", label: "My Vessels", icon: Ship, allowRoles: ["OWNER"] },
  { href: "/owner/brokers", label: "Brokers", icon: Handshake, allowRoles: ["OWNER"] },
  { href: "/owner/listing-approvals", label: "Listing Approvals", icon: ClipboardCheck, allowRoles: ["OWNER"] },
  { href: "/owner/profile", label: "Company profile", icon: Building2, allowRoles: ["OWNER"] },
];

import { ClipboardCheck, Handshake, Ship } from "lucide-react";

export const ownerNav = [
  { href: "/owner/vessels", label: "My Vessels", icon: Ship, allowRoles: ["OWNER"] },
  { href: "/owner/brokers", label: "Brokers", icon: Handshake, allowRoles: ["OWNER"] },
  { href: "/owner/listing-approvals", label: "Listing Approvals", icon: ClipboardCheck, allowRoles: ["OWNER"] },
];

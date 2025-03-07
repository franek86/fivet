import { RxDashboard } from "react-icons/rx";
import { MdOutlineDirectionsBoat, MdOutlineCategory } from "react-icons/md";
import { FaUsers, FaCircleUser, FaRegAddressCard } from "react-icons/fa6";

export const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: RxDashboard, allowRoles: ["admin", "user"] },
  { href: "/ships", label: "Ships", icon: MdOutlineDirectionsBoat, allowRoles: ["admin", "user"] },
  { href: "/categories", label: "Categories", icon: MdOutlineCategory, allowRoles: ["admin"] },
  { href: "/users", label: "Users", icon: FaUsers, allowRoles: ["admin"] },
  { href: "/address-book", label: "Address book", icon: FaRegAddressCard, allowRoles: ["admin", "user"] },
  { href: "/profile", label: "Profile", icon: FaCircleUser, allowRoles: ["user"] },
];

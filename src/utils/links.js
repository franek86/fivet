import { RxDashboard } from "react-icons/rx";
import { MdOutlineDirectionsBoat, MdOutlineCategory } from "react-icons/md";
import { FaUsers, FaCircleUser, FaRegAddressCard } from "react-icons/fa6";

export const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: RxDashboard, allowRoles: ["ADMIN", "USER"] },
  { href: "/ships", label: "Ships", icon: MdOutlineDirectionsBoat, allowRoles: ["ADMIN", "USER"] },
  { href: "/categories", label: "Categories", icon: MdOutlineCategory, allowRoles: ["ADMIN"] },
  { href: "/users", label: "Users", icon: FaUsers, allowRoles: ["ADMIN"] },
  { href: "/address-book", label: "Address book", icon: FaRegAddressCard, allowRoles: ["ADMIN", "USER"] },
  { href: "/profile", label: "Profile", icon: FaCircleUser, allowRoles: ["USER"] },
];

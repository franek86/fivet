import { RxDashboard } from "react-icons/rx";
import { MdOutlineDirectionsBoat, MdOutlineCategory } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

export const navLinks = [
  { href: "/", label: "Dashboard", icon: RxDashboard },
  { href: "/ships", label: "Ships", icon: MdOutlineDirectionsBoat },
  { href: "/categories", label: "Categories", icon: MdOutlineCategory },
  { href: "/users", label: "Users", icon: FaUsers },
];

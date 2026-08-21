import { adminNav } from "./adminNav.js";
import { brokerNav } from "./brokerNav.js";
import { ownerNav } from "./ownerNav.js";
import { buyerNav } from "./buyerNav.js";
import { sharedNav } from "./sharedNav.js";

const NAVIGATION = {
  ADMIN: adminNav,
  BROKER: brokerNav,
  OWNER: ownerNav,
  BUYER: buyerNav,
};

export function getNavigationForRole(role) {
  return [...(NAVIGATION[role] ?? []), ...sharedNav];
}

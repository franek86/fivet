// hooks/useVerificationStatus.js

import { useUser } from "./useAuth.js";

export function useVerificationStatus() {
  const { data: user } = useUser();

  if (!user) return null;

  if (user.role === "BROKER") return user.brokerProfile?.verificationStatus;
  if (user.role === "OWNER") return user.ownerProfile?.verificationStatus;
  return null;
}

// src/utils/authUtils.ts
import { authStore } from "../stores/authStore";

// Define UserDetails type
interface UserDetails {
  user_role: string;
  confirmation_agent?: boolean;
  [key: string]: string | number | boolean | undefined;
}

// Utility to get authentication and user details from the store
export function getAuth() {
  const { isAuthenticated, userDetails } = authStore.get();
  return { isAuthenticated, userDetails } as {
    isAuthenticated: boolean;
    userDetails: UserDetails | null;
  };
}

// Check if the user's role is allowed
export function checkRole(
  userDetails: UserDetails | null,
  allowedRoles: string[],
): boolean {
  if (!userDetails) return false;
  if (allowedRoles.includes(userDetails.user_role)) return true;

  // Special case for confirmation agents
  if (
    allowedRoles.includes("isConfirmationAgent") &&
    userDetails.confirmation_agent === true
  ) {
    return true;
  }
  return false;
}

// Check if the user is a confirmation agent
export function checkConfirmationAgent(
  userDetails: UserDetails | null,
): boolean {
  return userDetails?.confirmation_agent === true;
}

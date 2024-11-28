// src/stores/authStore.ts
import { atom, map } from "nanostores";

export interface UserDetails {
  user_name: string;
  [key: string]: string | number | boolean | undefined; // Allow for additional properties of common types
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  userDetails: UserDetails | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user:
    JSON.parse(localStorage.getItem("userDetails") || "{}")?.user_name || null,
  userDetails: JSON.parse(localStorage.getItem("userDetails") || "null"),
};

export const authStore = map<AuthState>(initialState);

export const isAuthenticated = atom<boolean>(initialState.isAuthenticated);

export function loginUser(userDetails: UserDetails, token: string) {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  localStorage.setItem("isAuthenticated", "true");

  authStore.set({
    isAuthenticated: true,
    user: userDetails.user_name,
    userDetails,
  });
  isAuthenticated.set(true);
}

export function logoutUser() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userDetails");
  localStorage.setItem("isAuthenticated", "false");

  authStore.set({
    isAuthenticated: false,
    user: null,
    userDetails: null,
  });
  isAuthenticated.set(false);
}

// New function to get userDetails as constant
export function getUserDetails() {
  return authStore.get().userDetails;
}
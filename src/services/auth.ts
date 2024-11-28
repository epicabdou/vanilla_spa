// src/services/auth.ts
import axiosInstance from "./axios";
import { loginUser, logoutUser, UserDetails } from "../stores/authStore";

export const login = async (
  username: string,
  password: string,
): Promise<void> => {
  try {
    const response = await axiosInstance.post("/login", {
      user_name: username,
      user_password: password,
    });
    const { token } = response.data;
    // Fetch user details after successful login and update store
    const userDetails = await getUserDetails(token);
    loginUser(userDetails, token);
    console.log("Login successful");
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const authToken = localStorage.getItem("auth_token");
  if (!authToken) {
    console.log("No token found, already logged out");
    return;
  }

  try {
    await axiosInstance.post("/logout", { token: authToken });
    console.log("Successfully logged out from server");
  } catch (error) {
    console.error("Server logout failed:", error);
  } finally {
    logoutUser();
    console.log("Client-side logout successful");
  }
};

const getUserDetails = async (token: string): Promise<UserDetails> => {
  try {
    const response = await axiosInstance.get("/get-user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error;
  }
};

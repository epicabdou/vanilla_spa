// src/stores/themeStore.ts
import { atom } from "nanostores";

// Dark mode state
export const darkMode = atom<boolean>(false);

// Toggle dark mode
export function toggleDarkMode() {
  darkMode.set(!darkMode.get());
}

// Initialize dark mode based on localStorage or system preferences
export function initializeDarkMode() {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    darkMode.set(true);
    document.documentElement.classList.add("dark");
  } else {
    darkMode.set(false);
    document.documentElement.classList.remove("dark");
  }

  darkMode.subscribe((isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

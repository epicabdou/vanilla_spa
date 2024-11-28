// src/components/Header.ts
import Alpine from "alpinejs";
import { darkMode, toggleDarkMode } from "../stores/themeStore.ts";

export const Header = (): string => {
  // Initialize Alpine.js
  document.addEventListener("alpine:init", () => {
    Alpine.data("darkModeComponent", () => ({
      isDark: darkMode.get(),
      init() {
        // Subscribe to Nano Store changes and update Alpine's state
        darkMode.subscribe((isDark: boolean) => {
          this.isDark = isDark;
        });
      },
      toggleDarkMode() {
        toggleDarkMode();
      },
    }));
  });
  return `
    <header class="bg-white shadow-md z-10 dark:bg-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <button class="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:hidden">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div x-data="darkModeComponent" x-init="init" class="flex items-center space-x-4">
            <!-- Dark Mode Toggle Button -->
            <button @click="toggleDarkMode()" class="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              dark mode
            </button>
            <div class="relative">
              <button class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <img class="h-8 w-8 rounded-full" src="/api/placeholder/100/100" alt="User avatar" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
};

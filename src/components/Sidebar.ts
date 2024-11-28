import { logout } from "../services/auth";
import { getUserDetails, UserDetails } from "../stores/authStore";

interface NavItem {
  icon: string;
  title: string;
  href: string;
  roles: string[];
  requireConfirmationAgent: boolean;
}

const navItems: NavItem[] = [
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "Dashboard",
    href: "/",
    roles: [
      "Administrateur",
      "Supermanager",
      "Agent",
      "Manager",
      "Commercial",
      "Commercial Chef",
      "Superviseur",
    ],
    requireConfirmationAgent: false,
  },
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Confirmation",
    href: "/confirmation",
    roles: ["Administrateur", "Agent", "Supermanager", "Manager"],
    requireConfirmationAgent: true,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  if (logoutButton) {
    logoutButton.onclick = async function () {
      console.log("logout button clicked");
      try {
        await logout();
        console.log("Logout successful");
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.onclick = function () {
      sidebar.classList.toggle("translate-x-0");
      sidebar.classList.toggle("-translate-x-full");
    };
  }
});

export const Sidebar = (): string => {
  const userDetails: UserDetails | null = getUserDetails();

  const sidebarItems = navItems
    .map((item) => {
      const userRole = userDetails ? userDetails.user_role : null;
      const showItem =
        !item.requireConfirmationAgent ||
        (item.requireConfirmationAgent && userDetails?.confirmation_agent);
      return showItem
        ? `
          <li class="mb-2" x-show="['${item.roles.join("','")}'].includes('${userRole}')">
            <a href="${item.href}" data-navigo class="flex items-center p-2 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors duration-200">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}" />
              </svg>
              <span class="ml-3 whitespace-nowrap">${item.title}</span>
            </a>
          </li>
        `
        : "";
    })
    .join("");

  return `
    <aside id="sidebar" class="bg-blue-800 text-white w-64 fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition duration-200 ease-in-out z-20">
      <div class="h-full flex flex-col">
        <div class="flex items-center justify-center h-16 bg-blue-900">
          <h2 class="text-2xl font-bold">Ecosphere.Green</h2>
        </div>
        <nav class="flex-grow overflow-y-auto">
          <ul class="space-y-2 py-4">
            ${sidebarItems}
          </ul>
        </nav>
        <div class="p-4 border-t border-blue-700">
          <button id="logoutButton" class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  `;
};

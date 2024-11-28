import Navigo from "navigo";
import { NotFound } from "./pages/notfound";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Confirmation } from "./pages/confirmation.ts";
import { getAuth, checkRole, checkConfirmationAgent } from "./utils/authUtils";
import { createLayout } from "./components/Layout";
import { initializeDarkMode } from "./stores/themeStore";

// Initialize dark mode
initializeDarkMode();

// Initialize the router
const router = new Navigo("/", { hash: false });

// Function to render the page content
const renderPage = (content: string) => {
  const pageContentElement = document.getElementById("page-content");
  if (pageContentElement) {
    pageContentElement.innerHTML = content;
  }
};

// Function to initialize the layout
const initializeLayout = () => {
  const rootElement = document.getElementById("app");
  if (rootElement) {
    rootElement.innerHTML = createLayout("");
  }
};

// Render login page without layout
const renderLoginPage = (content: string) => {
  const rootElement = document.getElementById("app");
  if (rootElement) {
    rootElement.innerHTML = content;
  }
};

// Initialize layout if authenticated
const { isAuthenticated } = getAuth();
if (isAuthenticated) {
  initializeLayout();
} else if (window.location.pathname !== "/login") {
  router.navigate("/login");
}

// Protected route handler with confirmation agent check
const protectRoute = (
  allowedRoles: string[],
  pageContent: () => string,
  requireConfirmationAgent = false,
) => {
  const { userDetails } = getAuth();

  // Check if the user has the required role
  if (!checkRole(userDetails, allowedRoles)) {
    router.navigate("/"); // Redirect to home if not authorized
    return "";
  }

  // If confirmation agent is required, check for that too
  if (requireConfirmationAgent && !checkConfirmationAgent(userDetails)) {
    router.navigate("/"); // Redirect to home if not a confirmation agent
    return "";
  }

  return pageContent();
};

// Define routes with role and confirmation agent protection
router
  .on("/", () =>
    renderPage(
      protectRoute(
        [
          "Administrateur",
          "Supermanager",
          "Agent",
          "Manager",
          "Commercial",
          "Commercial Chef",
          "Superviseur",
        ],
        Dashboard,
      ),
    ),
  )
  .on("/confirmation", () =>
    renderPage(
      protectRoute(
        ["Agent", "Supermanager", "Administrateur", "Manager"],
        Confirmation,
        true, // Require confirmation agent
      ),
    ),
  )
  .on("/login", () => {
    if (isAuthenticated) {
      // Redirect to the dashboard or home if already authenticated
      router.navigate("/");
    } else {
      // Render the login page if not authenticated
      renderLoginPage(Login());
    }
  })
  .notFound(() => renderPage(NotFound()));

// Resolve the initial route
router.resolve();

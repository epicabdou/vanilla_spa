import { login } from "../services/auth";
import Alpine from "alpinejs";

export const Login = (): string => {
  document.addEventListener("alpine:init", () => {
    Alpine.data("loginForm", () => ({
      username: "",
      password: "",
      isLoading: false,
      errorMessage: "",
      async submitForm() {
        this.isLoading = true;
        this.errorMessage = "";
        try {
          await login(this.username, this.password);
          window.location.href = "/";
        } catch (error) {
          this.errorMessage =
            "Login failed. Please check your credentials and try again.";
          console.error("Login error:", error);
        } finally {
          this.isLoading = false;
        }
      },
    }));
  });

  return `
    <div x-data="loginForm()" class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div class="p-8 bg-white shadow-2xl rounded-lg w-full max-w-md">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              x-model="username" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              x-model="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
              :disabled="isLoading"
            >
              <span x-show="!isLoading">Login</span>
              <span x-show="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            </button>
          </div>
        </form>
        <div 
          x-show="errorMessage" 
          x-transition:enter="transition ease-out duration-300"
          x-transition:enter-start="opacity-0 transform scale-90"
          x-transition:enter-end="opacity-100 transform scale-100"
          class="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700"
        >
          <p x-text="errorMessage"></p>
        </div>
      </div>
    </div>
  `;
};

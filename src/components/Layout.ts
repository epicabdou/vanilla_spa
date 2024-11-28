import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const createLayout = (pageContent: string): string => {
    return `
    <div class="flex h-screen bg-gray-100 overflow-hidden">
      ${Sidebar()}
      <div class="flex-1 flex flex-col overflow-hidden lg:ml-64">
        ${Header()}
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div class="max-w-7xl mx-auto">
            <div id="page-content" class="bg-white rounded-lg shadow-xl p-6">
              ${pageContent}
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
};
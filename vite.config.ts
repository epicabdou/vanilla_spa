import { defineConfig } from "vite";

export default defineConfig({
    // Define your server options here
    server: {
        port: 3000, // Set the server port
        // You can add more server options here
    },

    // Define build-specific options
    build: {
        outDir: "dist", // Specify the output directory
        // Additional build options can go here
    },

    // Plugins can be added here
    plugins: [],

    // Define any additional base configuration options
    // For example, you can set up alias paths
    resolve: {
        alias: {},
    },

    // Handling static assets in the public directory
    publicDir: "public", // This specifies the public directory for static assets
});
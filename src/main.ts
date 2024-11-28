// src/main.ts
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/style.css";
import "./app";
import Alpine from "alpinejs";

// Make Alpine available globally
(window as any).Alpine = Alpine;

Alpine.start();

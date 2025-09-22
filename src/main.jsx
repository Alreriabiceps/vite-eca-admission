import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

// Set up axios base URL
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("Frontend axios base URL:", axios.defaults.baseURL);
console.log("Environment VITE_API_URL:", import.meta.env.VITE_API_URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

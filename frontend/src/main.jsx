import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";

// Global reset styles for our dark cyber-academic theme
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  body {
    background-color: #0b0f19;
    color: #cbd5e1;
    overflow-x: hidden;
  }
`;
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
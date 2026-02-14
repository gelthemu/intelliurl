import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#264653",
          color: "#fff",
          border: "1px solid #e9c46a80",
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
        },
        success: {
          iconTheme: {
            primary: "#2a9d8f",
            secondary: "#fff",
          },
        },
      }}
    />
    <Analytics />
  </React.StrictMode>,
);

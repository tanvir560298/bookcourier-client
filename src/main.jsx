import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./providers/AuthProvider";
import router from "./routes/router";

const savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </AuthProvider>
  </React.StrictMode>
);
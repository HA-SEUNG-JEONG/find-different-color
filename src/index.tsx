import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer theme="colored" autoClose={3000} position="top-center" />
    <App />
  </React.StrictMode>
);

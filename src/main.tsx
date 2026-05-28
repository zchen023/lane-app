import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { LaneApp } from "./LaneApp";
import { AuthGate } from "./components/AuthGate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthGate>
      <LaneApp />
    </AuthGate>
  </React.StrictMode>
);
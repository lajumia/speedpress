import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Dashboard = () => {
    return(
        <>
            <h1>Dashboard Settings</h1>
        </>
    )
}

const initDashboard = () => {
    const dashboardDiv = document.getElementById("sp-dashboard-root");
  
    if (dashboardDiv) {
      const root = createRoot(dashboardDiv);
      root.render(<Dashboard />);
    } else {
      console.error("Dashboard root element not found.");
    }
  };

  document.addEventListener("DOMContentLoaded", initDashboard);
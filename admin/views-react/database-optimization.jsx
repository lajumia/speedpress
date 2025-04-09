import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Database = () => {
    return(
        <>
            <h1>Database Settings</h1>
        </>
    )
}
const initDatabase = () => {
    const databaseDiv = document.getElementById("sp-database-optimization-root");
  
    if (databaseDiv) {
      const root = createRoot(databaseDiv);
      root.render(<Database />);
    } else {
      console.error("Database root element not found.");
    }
  };

  document.addEventListener("DOMContentLoaded", initDatabase);
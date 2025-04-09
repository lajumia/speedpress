import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Image = () => {
    return(
        <>
            <h1>Image Settings</h1>
        </>
    )
}

const initImage = () => {
    const imageDiv = document.getElementById("sp-image-optimization-root");
  
    if (imageDiv) {
      const root = createRoot(imageDiv);
      root.render(<Image />);
    } else {
      console.error("Dashboard root element not found.");
    }
  };

  document.addEventListener("DOMContentLoaded", initImage);
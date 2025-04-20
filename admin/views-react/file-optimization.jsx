import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const File = () => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const styles = {
    container: {
      display: 'block',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid #ccc',
    },
    column: {
      display: 'flex',
      padding: '10px',
      justifyContent: 'flex-start',

    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
    },
    checkbox: {
      marginRight: '8px',
    },
  };

  return(
      <>
          <h1 className="sp-page-heading">File Optimization</h1>
          <h2 className="sp-css-heading">CSS Files</h2>

          <div style={styles.container}>
            <div style={styles.column}>
              <div className="left">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    style={styles.checkbox}
                />
              </div>
              <div className="right">
                <h4 className="setting-title">Minify CSS</h4>
                <p className="settings-des">Minify CSS removes whitespace and comments to reduce the file size.</p>
              </div>
            
              
            </div>
            
            
          </div>





      </>
    )
}

const initFile = () => {
    const fileDiv = document.getElementById("sp-file-optimization-root");
  
    if (fileDiv) {
      const root = createRoot(fileDiv);
      root.render(<File />);
    } else {
      console.error("Dashboard root element not found.");
    }
  };

  document.addEventListener("DOMContentLoaded", initFile);
import React, { StrictMode } from "react"; // React
// React's library to talk to browser (React DOM)
import { createRoot } from "react-dom/client"; 
import "./styles.css";

import App from "./App";

//injects the final product into index.html in the public folder
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
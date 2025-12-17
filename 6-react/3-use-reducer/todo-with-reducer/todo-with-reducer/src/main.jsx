import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GlobalState from "../../../../2-prop-drilling/use-context/context/context.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalState>
    <StrictMode>
      <App />
    </StrictMode>
  </GlobalState>
);

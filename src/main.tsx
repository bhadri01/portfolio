import "./styles/index.css";
import { lightweightRendering } from "./lib/renderPolicy";

document.documentElement.classList.toggle("lightweight-rendering", lightweightRendering);

import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

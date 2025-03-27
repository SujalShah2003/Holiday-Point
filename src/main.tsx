import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import './assets/css/index.css';
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);

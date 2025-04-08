import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/css/index.css";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import "react-toastify/dist/ReactToastify.css";

import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
);

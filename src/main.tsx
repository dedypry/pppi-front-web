import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.tsx";
import { Provider } from "./context/provider.tsx";

import "@/assets/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

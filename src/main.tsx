/* eslint-disable import/order */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { Provider } from "./context/provider.tsx";
import App from "./App.tsx";

import "@/assets/styles/globals.css";
import GoogleAds from "./components/google-adsense.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <HelmetProvider>
          <App />
          <GoogleAds />
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

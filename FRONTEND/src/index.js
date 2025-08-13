import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./index.css";

import AnimalApp from './App.js';           // Animal Management app
import { App as PlantApp } from './P-App.js'; // Plant Management app

import { LanguageProvider } from './Components/AnimalManagement/contexts/LanguageContext.js';
import { ThemeProvider } from './Components/AnimalManagement/contexts/ThemeContext.js';

function RootRouter() {
  const location = useLocation();

  if (location.pathname.startsWith('/PlantManagement')) {
    return <PlantApp />;
  }

  // Default to Animal Management app
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AnimalApp />
      </ThemeProvider>
    </LanguageProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <RootRouter />
    </React.StrictMode>
  </BrowserRouter>
);

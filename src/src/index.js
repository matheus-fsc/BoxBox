import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PhaserGame from "./PhaserGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Menu from "./Menu/Menu";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

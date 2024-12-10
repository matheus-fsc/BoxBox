import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PhaserGame from "./PhaserGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./src/Home/Home";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Game/PhaserGame.js" element={<PhaserGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

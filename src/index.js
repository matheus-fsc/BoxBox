import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import PhaserGame from "./Game/PhaserGame";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<PhaserGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

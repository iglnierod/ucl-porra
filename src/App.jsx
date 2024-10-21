import React from "react";
import { Routes, Route } from "react-router-dom";
import { MenuBar } from "./components/MenuBar.jsx";
import { Standings } from "./components/standings/Standings.jsx";
import { Matches } from "./components/matches/Matches.jsx";
import { Predictions } from "./components/predictions/Predictions.jsx";

export function App() {
  return (
    <main className="py-4 px-4 w-full flex flex-col items-center">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Standings />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/predictions" element={<Predictions />} />
      </Routes>
    </main>
  );
}

export default App;

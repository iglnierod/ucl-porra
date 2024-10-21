import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "./MenuItem.jsx";

export function MenuBar() {
  return (
    <nav className="flex w-10/12 justify-between">
      <section>
        <h1 className="text-xl cursor-pointer p-2">Porra GGT</h1>
      </section>
      <section className="flex gap-4">
        <Link to="/">
          <MenuItem value="Inicio" />
        </Link>
        <Link to="/matches">
          <MenuItem value="Partidos" />
        </Link>
        <Link to="/predictions">
          <MenuItem value="Predicciones" />
        </Link>
      </section>
    </nav>
  );
}

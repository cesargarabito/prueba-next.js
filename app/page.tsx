"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Acceso from "@/componentes/Acceso";
import Bienvenida from "@/componentes/Bienvenida";

export default function Home() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Acceso />} />
          <Route path="/Bienvenida" element={<Bienvenida />} />
        </Routes>
      </Router>
    </Provider>
  );
}

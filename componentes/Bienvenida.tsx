import React from "react";
import Tabla from "./Tabla";

const Bienvenida = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Usuarios</h1>
      <Tabla />
    </div>
  );
};

export default Bienvenida;

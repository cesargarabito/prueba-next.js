import React from "react";
import Login from "./Login";
import Registro from "./Registro";

export default function App() {
  return (
    <div
      className="bg-opacity-70"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1279275174/es/vector/peque%C3%B1os-usuarios-de-redes-sociales-con-gadgets.jpg?s=612x612&w=0&k=20&c=AJjx5nYQDyEwB1aP2OmruEFlJ5gvF5mUejnTX2Z-LHk=')`,
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        paddingTop: '0',
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-0 mb-4">
          Bienvenido/a a la aplicación
        </h1>
        <div className="w-full max-w-lg bg-gray-200 p-4 rounded-lg flex justify-center gap-12">
          <Login />
          <Registro />
        </div>
      </div>
    </div>
  );
}

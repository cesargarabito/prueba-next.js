import React from 'react'
import Login from './Login'
import Registro from './Registro'

export default function 
() {
  return (
    <div>
        <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenido/a a la aplicación</h1>
      <div className="w-full max-w-lg bg-gray-200 p-4 rounded-lg flex justify-center gap-12">
        <Login />
        
        <Registro />
      </div>
    </div>
        
    </div>
  )
}

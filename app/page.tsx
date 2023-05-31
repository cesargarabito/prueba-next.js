'use client';
import Image from 'next/image'
import Login from '@/componentes/Login'
import Registro from '@/componentes/Registro'
import {Provider, useDispatch} from 'react-redux'
import {store} from '../store/store'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '@/componentes/firebaseConfig';
import { useEffect } from 'react';
import { setCurrentUser } from '../store/userAction';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Acceso from '@/componentes/Acceso';
import Bienvenida from '@/componentes/Bienvenida';



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
};


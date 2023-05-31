'use client';
import Image from 'next/image'
import Login from '@/componentes/Login'
import Registro from '@/componentes/Registro'
import {Provider, useDispatch} from 'react-redux'
import {store} from '../store/store'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '@/componentes/firebaseConfig';
import { useEffect } from 'react';
import { setCurrentUser } from '../store/userAction';



export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <Provider store={store}>
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenido/a a la aplicación</h1>
      <div className="w-full max-w-lg bg-gray-200 p-4 rounded-lg flex justify-center gap-12">
        <Login />
        <Registro />
      </div>
    </div>
    </Provider>
  );
};


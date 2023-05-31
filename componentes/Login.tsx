import { useEffect, useState } from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInUserAuthWithEmailAndPassword, onAuthStateChangedListener } from './firebaseConfig';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/userAction';
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  
  email: '',
  password: ''
  
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);
    // const logGoogleUser = async () => {
    //     const { user } = await signInWithGooglePopup();
    //     createUserDocumentFromAuth(user);
    // }
    const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  //console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const response = await signInUserAuthWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
      Swal.fire('Enhorabuena', 'Te has logueado correctamente' ,'success');
      if(response?.user){
        navigate('/Bienvenida');
      }
    } catch (error: any) {
      if(error.code === 'auth/user-not-found' || error.code === 'wrong-password'){
        Swal.fire('Error de acceso', 'Usuario no registrado/contrasena incorrecta', 'error')
      } else{
        console.log(error, 'no created user')
      }
    
    }
  }
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }
 

  return (
    <div className="container mx-auto max-w-sm">
      <h2 className="text-2xl font-bold mb-4">¿Ya tienes una cuenta?</h2>
      <h5 className="text-1xl mb-4">Usa tu correo y contrasena para acceder</h5>
      <form onSubmit={handleSubmit}>
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={handleChange}
        name='email'
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handleChange}
        name='password'
      />
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        //onClick={handleLogin}
      >
        Iniciar sesión
      </button>
      <br></br>
      {/* <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={logGoogleUser}
      >
        Google sign in
      </button> */}
      </form>
    </div>
  );
};

export default Login;


import { useState, useEffect } from 'react';
//import firebase from './firebaseConfig';
 // Importa tu archivo de configuración de Firebase
//import 'firebase/auth'; // Importa el módulo de autenticación
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from './firebaseConfig';
import Swal from 'sweetalert2';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  displayLastname: '',
  phone: '',
  birthDate: '',
  isAdmin: false 
}

const Registro = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword, displayLastname, phone, birthDate, isAdmin } = formFields;
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert('passwords do not match');
      return;
    }
    try {
      const response = await createUserAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(response?.user, {displayName, displayLastname, phone, birthDate, isAdmin });
      resetFormFields();
      Swal.fire('Registro exitoso', 'El usuario se ha registrado correctamente', 'success');
    } catch (error: any) {
      if(error.code === 'auth/email-already-in-use'){
        Swal.fire('Error de registro', 'Este email ya esta en uso', 'error');
      } else{
        console.log(error, 'no created user')
      }
    
    }
  }
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const [esAdmin, setEsAdmin] = useState(false);

  
  
    

  return (
    <div className="container mx-auto max-w-sm">
      <h2 className="text-2xl font-bold mb-4">¿Aún no tienes una cuenta?</h2>
      <h5 className="text-lg mb-4">Regístrate y empieza a ver contenido ya!</h5>
      <form onSubmit={handleSubmit}>
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={handleChange}
        name='email'
        pattern=".{0,100}"
        title="El correo electrónico debe tener máximo 100 caracteres."
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handleChange}
        name='password'
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}"
        required
        title="La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un dígito y tener entre 8 y 50 caracteres."
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="password"
        placeholder="Repetir Contraseña"
        value={confirmPassword}
        onChange={handleChange}
        name='confirmPassword'
        required
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="text"
        placeholder="Nombre"
        value={displayName}
        onChange={handleChange}
        pattern=".{3,100}"
        required
        name='displayName'
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="text"
        placeholder="Apellidos"
        value={displayLastname}
        onChange={handleChange}
        pattern=".{3,100}"
        required
        name='displayLastname'
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="text"
        placeholder="Número de teléfono"
        value={phone}
        onChange={handleChange}
        name='phone'
        pattern="[0-9]{9}"
        title="Debe ingresar un número de teléfono válido de 9 dígitos."
        required
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="text"
        placeholder="Fecha de nacimiento"
        value={birthDate}
        onChange={handleChange}
        name='birthDate'
        required
        pattern="\d{2}/\d{2}/\d{4}"
        title="Formato de fecha no válido. Utilice el formato dd/mm/yyyy."
      />
      <div className="flex items-center mb-4">
        <input
          type="radio"
          className="mr-2"
          checked={isAdmin}
          onChange={handleChange}
          name='isAdmin'
        />
        <label>Registrarse como administrador</label>
      </div>
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
         type='submit'
      >
        Registrarse
      </button>
      </form>
    </div>
  );
};

export default Registro;


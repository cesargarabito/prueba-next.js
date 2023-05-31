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
  confirmPassword: ''
}

const Registro = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);
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
      const {user} = await createUserAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
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
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    // Este efecto se ejecutará solo en el lado del cliente
    // Aquí puedes realizar cualquier acción específica del cliente, como manipulación del DOM o llamadas a API.
  }, []);

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

  // const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setConfirmPassword(e.target.value);
  // };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  const handleApellidosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellidos(e.target.value);
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefono(e.target.value);
  };

  const handleFechaNacimientoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaNacimiento(e.target.value);
  };

  const handleEsAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEsAdmin(e.target.checked);
  };

  const handleRegistro = () => {
    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }
  
    // Registra al usuario con su correo electrónico y contraseña
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((userCredential: { user: any; }) => {
//         // Usuario registrado exitosamente
//         const user = userCredential.user;
//         console.log('Usuario registrado:', user.uid);
//         // Aquí puedes realizar otras acciones después del registro, como guardar datos adicionales del usuario en Firestore
//       })
//       .catch((error: { message: any; }) => {
//         // Ocurrió un error durante el registro
//         console.log('Error al registrar usuario:', error.message);
//       });
 };
  

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
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handleChange}
        name='password'
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="password"
        placeholder="Repetir Contraseña"
        value={confirmPassword}
        onChange={handleChange}
        name='confirmPassword'
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
        value={apellidos}
        onChange={handleApellidosChange}
        pattern=".{3,100}"
        required
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="text"
        placeholder="Número de teléfono"
        value={telefono}
        onChange={handleTelefonoChange}
      />
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        type="text"
        placeholder="Fecha de nacimiento"
        value={fechaNacimiento}
        onChange={handleFechaNacimientoChange}
      />
      <div className="flex items-center mb-4">
        <input
          type="radio"
          className="mr-2"
          checked={esAdmin}
          onChange={handleEsAdminChange}
        />
        <label>Registrarse como administrador</label>
      </div>
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleRegistro} type='submit'
      >
        Registrarse
      </button>
      </form>
    </div>
  );
};

export default Registro;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteUser, getUsers, updateUserDB } from './firebaseConfig';
import Registro from './Registro';


const UserTable = () => {
const [usersDB, setUsersDB] = useState<any[]>([]);
const [showRegistro, setShowRegistro] = useState(false);
const [userToUpdate, setUserToUpdate] = useState({});
    const handleUsers = async () => {
        try {
            const users = await getUsers();
        setUsersDB(users);
        } catch (error) {
            console.log(error);
        }
        
    }
   const removeUser = async (idUser: any) => {
    await deleteUser(idUser);
    handleUsers();
   }
   const mostrarRegistro = (userData: any) => {
    setShowRegistro(true);
    setUserToUpdate(userData);

    }
    const updateUserData = async (idUser: any) => {
        await updateUserDB(idUser, );
        handleUsers();
    }
   


    useEffect(() => {
        handleUsers();
    }, []);

    
     
  const [searchTerm, setSearchTerm] = useState('');
const filteredUsers = usersDB.filter((user) =>
  user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
);


  

  return (
    
    <div className="flex flex-col overflow-x-auto">
  <div className="sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div> 
        <input 
        placeholder='Buscar por nombre'
        value={searchTerm} 
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
        type="text" onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Administrador</th>
              <th scope="col" className="px-6 py-4">Nombre</th>
              <th scope="col" className="px-6 py-4">Apellidos</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Telefono</th>
              <th scope="col" className="px-6 py-4">Fecha de nacimiento</th>
              <th scope="col" className="px-6 py-4">Acciones</th>
              <th scope="col" className="px-6 py-4">Comentarios</th>
              
              
              
            </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user) => {
            
            
           return (
            <tr key={user.id} className="border-b dark:border-neutral-500">
              
              <td className="whitespace-nowrap px-6 py-4">{user.isAdmin}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.displayName}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.displayLastname}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.phone}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.birthDate}</td>
              <td className="whitespace-nowrap px-6 py-4">
  <button 
  onClick={() =>{removeUser(user.id)}}
  >Eliminar</button>
  <button 
  onClick={() =>{mostrarRegistro(user)}}
  >Actualizar</button>
</td>

              
              
            </tr>
)})}
           
          </tbody>
        </table>
        {showRegistro && <Registro userDataUpdate={userToUpdate}/>}
        
      </div>
    </div>
  </div>
</div>
  );
};

export default UserTable;

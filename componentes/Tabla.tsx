import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteUser, getUsers, saveUserDB, updateUserDB } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';


const UserTable = () => {
const [usersDB, setUsersDB] = useState<any[]>([]);
const [userName, setUserName] = useState('');
const [updateUserName, setUpdateUserName] = useState('');
const [updateLastname, setUpdateLastname] = useState('');
const [userID, setUserID] = useState();
const [showModal, setShowModal] = useState(false);
const [showModalSave, setShowModalSave] = useState(false);
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
const [searchTerm, setSearchTerm] = useState('');
const [lastname, setLastname] = useState('');
const [isAdmin, setIsAdmin] = useState(false);
const [phone, setPhone] = useState('');
const [birthDate, setBirthDate] = useState('');
const [email, setEmail] = useState('');
const [updateEmail, setUpdateEmail] = useState('');
const [updatePhone, setUpdatePhone] = useState('');
const [updateBirthDate, setUpdateBirthDate] = useState('');
const [updateIsAdmin, setUpdateIsAdmin] = useState(false);
const navigate = useNavigate();
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
   
    const updateUserData = async (userID: any, updateUserName: any, updateLastname: any, updateEmail: any, updateBirthDate: any, updateIsAdmin:any, updatePhone: any) => {
        await updateUserDB(userID, updateUserName, updateLastname, updateEmail, updateBirthDate, updateIsAdmin, updatePhone);
        handleUsers();
        setShowModal(false);
    }
   
    const openModal = (userID: any) => {
        setUserID(userID);
        setShowModal(true); 
      };

      const openModalSave = () => {
        
        setShowModalSave(true); 
      };

    useEffect(() => {
        handleUsers();
    }, []);

     
  
const filteredUsers = usersDB.filter((user) =>
  user.displayName && user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
).sort((a, b) => {
    const nameA = a.displayName.toLowerCase();
    const nameB = b.displayName.toLowerCase();
    if (nameA < nameB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
const saveUser = () => {
    saveUserDB(userName, lastname, phone, birthDate, isAdmin, email);
    handleUsers();
    setUserName('');
    setShowModalSave(false);
    
}


  return (
    
    <div className="flex flex-col overflow-x-auto">
        <div className="flex items-center justify-between p-4 bg-gray-200">
       
        <input
          placeholder='Buscar por nombre'
          value={searchTerm}
          className="w-64 px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        
        <select
          className="w-25 px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

       
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded focus:outline-none hover:bg-blue-600" onClick={() => openModalSave()}>
          Crear
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded focus:outline-none hover:bg-red-600" onClick={() => navigate('/')}>
          Salir
        </button>
      </div>

  <div className="sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
    <div>
  {showModalSave && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto mx-auto max-w-3xl">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
            <h3 className="text-2xl font-semibold">Crea un nuevo usuario</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModalSave(false)}
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <input
              type="text"
              placeholder="Nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Fecha de nacimiento"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mr-2"
              />
              Administrador
            </label>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
            <button
              className="px-6 py-2 mr-4 text-sm font-medium text-red-500 uppercase bg-transparent border border-red-500 rounded outline-none hover:bg-red-500 hover:text-white focus:outline-none"
              onClick={() => setShowModalSave(false)}
            >
              Cancelar
            </button>
            <button
              className="px-6 py-2 text-sm font-medium text-green-500 uppercase bg-transparent border border-green-500 rounded outline-none hover:bg-green-500 hover:text-white focus:outline-none"
              onClick={saveUser}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
        <div>
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto mx-auto max-w-3xl">
                  <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                      <h3 className="text-2xl font-semibold">Actualizar datos de usuario</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      
                      <input
                        type="text"
                        placeholder='Nombre'
                        value={updateUserName}
                        onChange={(e) => setUpdateUserName(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                       <input
            type="text"
            placeholder="Apellido"
            value={updateLastname}
            onChange={(e) => setUpdateLastname(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={updatePhone}
            onChange={(e) => setUpdatePhone(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={updateBirthDate}
            onChange={(e) => setUpdateBirthDate(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={updateIsAdmin}
              onChange={(e) => setUpdateIsAdmin(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">Es administrador</span>
          </label>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
                      <button
                        className="px-6 py-2 mr-4 text-sm font-medium text-red-500 uppercase bg-transparent border border-red-500 rounded outline-none hover:bg-red-500 hover:text-white focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="px-6 py-2 text-sm font-medium text-green-500 uppercase bg-transparent border border-green-500 rounded outline-none hover:bg-green-500 hover:text-white focus:outline-none"
                        onClick={() => updateUserData(userID, updateUserName, updateLastname, updateEmail,
                            updatePhone,
                            updateBirthDate,
                            updateIsAdmin)}
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
  onClick={() =>{removeUser(user.id)}}>Eliminar</button>
  <button 
  onClick={() =>{openModal(user.id)}}>Modificar</button>
</td>
            </tr>
)})}
           
          </tbody>
        </table>
        
      </div>
    </div>
  </div>
</div>
  );
};

export default UserTable;

import Tabla from './Tabla'


const Bienvenida = () => {
    // Obtén la lista de usuarios desde el estado de Redux
    //const users = useSelector(state => state.users);
  
    return (
      <div>
        <h1>Usuarios</h1>
        <Tabla />
        <ul>
            
          {/* {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))} */}
        </ul>
      </div>
    );
  };
  
  export default Bienvenida;
  
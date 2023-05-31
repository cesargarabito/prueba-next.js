import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Bienvenida from '../componentes/Bienvenida';
import Login from '../componentes/Login';


const App = () => {
    //const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* {isAuthenticated ? ( */}
            <Route path="/bienvenida" element={<Bienvenida />} />
          {/* ) : ( */}
            <Navigate to="/login" />
          {/* )} */}
        </Routes>
      </Router>
    );
  };
  
  export default App;
  

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { getUserProfile } from '../services/userService';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para agregar un usuario al estado
  const addUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  //  Cargar datos del usuario al iniciar la app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Error al cargar perfil del usuario:', error);
        setUser(null);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, addUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Validación de las propiedades
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};




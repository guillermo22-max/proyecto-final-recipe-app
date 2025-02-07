
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { useContext } from 'react';
import UserContext from '../../context/UserContext.jsx';
import Footer from './Footer.jsx';

function Sidebar({ onSidebarClick }) {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleNavigation = (path) => {
    navigate(path);
    if (onSidebarClick) {
      onSidebarClick(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    logout();
    navigate('/');
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar d-flex flex-column vh-100 p-2 shadow-sm">
        <div className="sidebar-img-container"
        onClick={() => handleNavigation('/')} 
        style={{cursor: "pointer"}}
        title="Home">
          <h4 className="mb-4 text-center fw-bold">
            <img src="/logo-solo.png" alt="Logo" className="sidebar-image w-75 h-100 ms-1" />
          </h4>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item" onClick={() => handleNavigation('/recipes')}>
            <i className="bi bi-book me-3 fs-3 text-dark"></i>Generar receta
          </li>
          <li className="nav-item" onClick={() => handleNavigation('/shopping-list')}>
            <i className="bi bi-cart me-3 fs-3 text-dark"></i>Lista de la compra
          </li>
          <li className="nav-item" onClick={() => handleNavigation('/meal-plan')}>
            <i className="bi bi-calendar me-3 fs-3 text-dark"></i>Plan de comidas
          </li>
          <li className="nav-item" onClick={() => handleNavigation('/saved-recipes')}>
            <i className="bi bi-journals me-3 fs-3 text-dark"></i>Recetas guardadas
          </li>
          <li className="nav-item" onClick={() => handleNavigation('/profile')}>
            <i className="bi bi-person me-3 fs-3 text-dark"></i>Perfil
          </li>
          <li className="nav-item my-3" onClick={handleLogout}>
            <i className="bi bi-exclamation-circle-fill me-3 fs-3 text-danger"></i>
            Cerrar sesión
          </li>
          <li className="nav-item my-3 align-self-end">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <i className="bi bi-facebook fs-5 text-primary me-4"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <i className="bi bi-instagram fs-5 text-danger me-4"></i>
            </a>
            <a
              href="https://www.threads.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <i className="bi bi-threads-fill fs-5 text-dark me-4"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <i className="bi bi-twitter-x fs-5 text-light me-4"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onSidebarClick: PropTypes.func,
};

export default Sidebar;
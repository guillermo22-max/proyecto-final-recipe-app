import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { useContext } from 'react';
import UserContext from '../../context/UserContext.jsx';

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
        <h4 className="mb-4 text-center fw-bold">
          <img src="/logo-solo.png" alt="Logo" className="navbar-image w-75 h-100" />
        </h4>
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
          <li className="nav-item">
            <i className="bi bi-box-arrow-right me-3 fs-3 text-danger" onClick={handleLogout}></i>Cerrar sesión
          </li>
          <li className="nav-item mt-3">
            <i class="bi bi-facebook fs-5 text-primary me-4"></i><i class="bi bi-instagram fs-5 text-danger me-4"></i> <i class="bi bi-threads-fill fs-5 text-dark me-4"></i><i class="bi bi-twitter-x fs-5 text-light me-4"></i>
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


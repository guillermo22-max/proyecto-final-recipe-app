import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

function Sidebar({ onSidebarClick }) {
  const navigate = useNavigate();

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
        <h4 className="mb-4 text-center fw-bold"><img src="/logo-solo.png" alt="Logo" className="navbar-image w-75 h-100" /></h4>
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
          <li className="nav-item" onClick={() => handleNavigation('/tags')}>
            <i className="bi bi-tags me-3 fs-3 text-dark"></i>Etiquetas
          </li>
          <li className="nav-item" onClick={() => handleNavigation('/saved-recipes')}>
            <i className="bi bi-journals me-3 fs-3 text-dark"></i>Recetas guardadas
          </li>
          <li className="nav-item" onClick={() => handleNavigation('/profile')}>
            <i className="bi bi-person me-3 fs-3 text-dark"></i>Perfil
          </li>
        </ul>
        <button className="btn btn-danger w-50" onClick={handleLogout}>
          X
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onSidebarClick: PropTypes.func,
};

export default Sidebar;


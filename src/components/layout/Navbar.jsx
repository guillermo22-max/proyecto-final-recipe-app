import PropTypes from 'prop-types';
import { useState } from 'react';

function Navbar({ onRegisterClick }) {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ backgroundColor: '#F4A261' }}
    >
      {/* Logo */}
      <a className="navbar-brand" href="#" style={{pointer: "cursor"}}>
        <img src="/logo-horizontal.png" alt="Logo" className="navbar-image" />
      </a>

      {/* Menú hamburguesa */}
      <button
        className="btn btn-success navbar-toggler d-lg-none"
        type="button"
        aria-controls="navbarMenu"
        aria-expanded={menuOpen ? 'true' : 'false'}
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        
      >
        <span
          className="navbar-toggler-icon"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='white' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`,
          }}
        ></span>
      </button>

      {/* Opciones del menú */}
      <div
        className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
        id="navbarMenu"
      >
        <div className="ms-auto">
          {/* Botón grande para dispositivos grandes */}
          <button
            className="btn btn-success d-none d-lg-inline me-2"
            onClick={onRegisterClick}
          >
            Registrate
          </button>

          {/* Opciones para el menú hamburguesa */}
          {menuOpen && (
            <div className="d-lg-none">
              <button
                className="btn btn-success w-100 mb-2"
                onClick={onRegisterClick}
              >
                Iniciar Sesión
              </button>
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
};

export default Navbar;


import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import UserContext from '../../context/UserContext';

function LoginModal({ show, onClose, onRegisterClick }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError('');
    try {
      const response = await loginUser(formData.email, formData.password);

      if (response?.access_token && response?.user) {
        const { access_token, user } = response;

        // Almacena token y datos del usuario
        localStorage.setItem('token', access_token);
        localStorage.setItem('userData', JSON.stringify(user));

        // Actualiza el estado global
        addUser(user);
        onClose();
        navigate('/profile');
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Correo o contraseña incorrectos');
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar Sesión</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <p className="text-danger">{error}</p>}
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="form-control mb-2"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="input-group mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <p>
              ¿No tienes una cuenta?{' '}
              <a href="#" onClick={onRegisterClick}>
                Regístrate aquí
              </a>
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default LoginModal;
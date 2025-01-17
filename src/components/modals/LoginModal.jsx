import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import UserContext from '../../context/UserContext';
import ForgotPasswordModal from './ForgotPasswordModal';

function LoginModal({ show, onClose, onRegisterClick }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    try {
      const response = await loginUser(formData.email, formData.password);
      localStorage.setItem('token', response.access_token);
      addUser(response.user);
      onClose();
      navigate('/profile');
    } catch (error) {
      setError('Correo o contraseña incorrectos');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal d-block bg-dark bg-opacity-50">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Iniciar Sesión</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {error && <p className="text-danger">{error}</p>}
              <input type="email" name="email" placeholder="Correo" className="form-control mb-2" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Contraseña" className="form-control mb-2" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <p>¿No tienes cuenta? <a href="#" onClick={onRegisterClick}>Regístrate</a></p>
              <p>¿Olvidaste tu contraseña? <a href="#" onClick={() => setShowForgotPassword(true)}>Recupérala aquí</a></p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleSubmit}>Iniciar Sesión</button>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal show={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
    </>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default LoginModal;

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SearchSection from '../components/recipes/SearchSection';
import RecipeCards from '../components/recipes/RecipeCards';
import Footer from '../components/layout/Footer';
import LoginModal from '../components/modals/LoginModal';
import RegistrationModal from '../components/modals/RegistrationModal';
import RandomIcon from '../components/RandomIcon';
import UserContext from '../context/UserContext';

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const { user } = useContext(UserContext);
  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const navigate = useNavigate();

  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);

  const handleOpenRegistrationModal = () => {
    setShowLoginModal(false);
    setShowRegistrationModal(true);
  };

  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);

  const handleClick = () => {
    if (!user) {

      if (hasSearchedOnce) {
        setShowLoginModal(true);
      } else {
        
        setHasSearchedOnce(true);
        navigate('/recipes');
      }
    } else {
      navigate('/recipes'); 
    }
  };
  return (
    <div>
      <Navbar onRegisterClick={handleOpenLoginModal} />
      <div className="text-center my-4">
        <RandomIcon />
      </div>
      <div className="text-center my-5">
        <h1>Encuentra tu receta perfecta</h1>
        <p>Busca recetas personalizadas con nuestra IA</p>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Ingresa un ingrediente o plato"
          />
          <button className="btn btn-success ms-2" onClick={handleClick}>Buscar</button>
        </div>
      </div>
      <RecipeCards />
      <Footer />

      {/* Modal de Inicio de Sesión */}
      <LoginModal
        show={showLoginModal}
        onClose={handleCloseLoginModal}
        onRegisterClick={handleOpenRegistrationModal}
      />

      {/* Modal de Registro */}
      <RegistrationModal
        show={showRegistrationModal}
        onClose={handleCloseRegistrationModal}
      />
    </div>
  );
}

export default Home;


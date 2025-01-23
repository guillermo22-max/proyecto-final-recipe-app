import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import SearchSection from '../components/recipes/SearchSection';
import RecipeCards from '../components/recipes/RecipeCards';
import Footer from '../components/layout/Footer';
import LoginModal from '../components/modals/LoginModal';
import RegistrationModal from '../components/modals/RegistrationModal';
import RandomIcon from '../components/RandomIcon';

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleOpenRegistrationModal = () => {
    setShowLoginModal(false); 
    setShowRegistrationModal(true); 
  };

  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);

  return (
    <div>
      <Navbar onRegisterClick={handleOpenLoginModal} />
      <div className="text-center my-4">
        <RandomIcon />
      </div>
      <SearchSection onSearchClick={handleOpenLoginModal} />
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


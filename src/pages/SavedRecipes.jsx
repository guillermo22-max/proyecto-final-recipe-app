import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import '../styles/savedRecipes.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';
import Footer from '../components/layout/Footer.jsx';

import { EffectCoverflow, Pagination } from 'swiper/modules';

const getSavedRecipes = async () => {
  const response = await api.get('/recipe/saved');
  console.log(response);
  return response.data;
};

const deleteRecipe = async (id) => {
  await api.delete(`/recipe/${id}`);
};

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 2000);
  };


  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getSavedRecipes();
      console.log(recipes);
      setSavedRecipes(recipes);
    } catch (err) {
      setError('Error al cargar las recetas guardadas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
      showAlert('success', 'Receta eliminada con éxito');
    } catch (err) {
      console.error('Error al eliminar la receta:', err);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  return (
    <div className="saved-recipes-container">
      <Sidebar />
 
        <div className="saved-recipes content">
          {alert.show && (
            <div className="alert-overlay"
              onClick={() => setAlert({ show: false, type: '', message: '' })}>
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            </div>
          )}
          <h1 className="text-center my-4">Recetas Guardadas</h1>
          {loading ? (
            <p>Cargando recetas...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : savedRecipes.length === 0 ? (
            <p>No tienes recetas guardadas aún.</p>
          ) : (
            <Swiper
              scrollbar={{
                hide: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={false}
              centeredSlides={true}
              spaceBetween={30}
              effect={'coverflow'}
              grabCursor={true}
              slidesPerView={'1'}
              slidesPerGroup={'1'}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Autoplay, Scrollbar]}
              className="mySwiper"
              breakpoints={{
                // Pantallas pequeñas
                480: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 20,
                },
                // Tablets
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 30,
                },
                // Pantallas grandes
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                  spaceBetween: 20,
                },
              }}
            >
              {savedRecipes.map((recipe) => (
                <SwiperSlide key={recipe.id}>
                  <div
                    className="recipe-card-saved"
                    style={{ backgroundImage: `url(${recipe.foto_url})` }}
                  >
                    <div className="recipe-content-saved h-100 d-flex flex-column justify-content-between">
                      <h3 className="text-center w-100">{recipe.titulo}</h3>
                      <p>{recipe.descripcion}</p>
                      <p><strong>Tiempo:</strong> {recipe.tiempo_elaboracion}</p>
                      <p><strong>Calorías:</strong> {recipe.calorias}</p>
                      <div className="d-flex justify-content-end align-items-center w-100">
                        <button
                          onClick={() => navigate(`/recipe/${recipe.id}`)}
                          className="btn btn-success"
                          title="Ver receta completa"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="btn btn-danger"
                          title="Eliminar receta"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div>
          <Footer />
        </div>

    </div>
  );
};

export default SavedRecipes;

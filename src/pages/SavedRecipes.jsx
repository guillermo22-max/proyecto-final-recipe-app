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
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [searchInput, setSearchInput] = useState('');


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
      setSelectedRecipe(null);
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
        <div className="d-flex justify-content-between">
          <h1 className="text-start my-4 w-50">Recetas Guardadas</h1>
          <div className="d-flex flex justify-content-end align-items-center w-50">
            <label className="me-2"><i className="bi bi-search-heart fs-2"></i>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Busca tu receta guardada"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
        </div>
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
              disableOnInteraction: true,
            }}
            loop={true}
            centeredSlides={true}
            spaceBetween={50}
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
            {savedRecipes.filter((recipe) =>
              recipe.titulo.toLowerCase().includes(searchInput.toLowerCase())
            )
              .map((recipe) => (
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
                          onClick={() => setSelectedRecipe(recipe)}
                          // {() => navigate(`/recipe/${recipe.id}`)}
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

      {selectedRecipe && (
        <div className="recipe-detail content mt-5">
          <div>
            <div className="recipe-card-horizontal">
              <div className="recipe-title">
                <h1 className="recipe-title fs-1 text-center">
                  {selectedRecipe.titulo}
                </h1>
              </div>
              <div className="recipe-header">
                <div className="d-flex flex-column w-50">
                  <img
                    className="recipe-image mb-4"
                    src={selectedRecipe.foto_url}
                    alt="foto-receta"
                  />
                </div>
                <div className="recipe-info w-50 my-auto">
                  <p>{selectedRecipe.descripcion}</p>
                </div>
              </div>
              <div className="recipe-header flex-wrap">
                <div>
                  <p>
                    <strong>Valores nutricionales:</strong>
                  </p>
                  <ul>
                    {selectedRecipe.nutrientes.split('\n').map((e, index) => (
                      <li key={index}>{e}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <strong>Calorías:</strong>{' '}
                  {selectedRecipe.calorias || 'No especificadas'}
                </p>
                <p>
                  <strong>Tiempo de preparación:</strong>{' '}
                  {selectedRecipe.tiempo_elaboracion || 'No especificado'}
                </p>
              </div>
              <div className="recipe-content">
                <div className="recipe-section">
                  <p>
                    <strong>Ingredientes:</strong>
                  </p>
                  <ul>
                    {selectedRecipe.ingredients.split('\n').map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <p>
                    <strong>Pasos:</strong>
                  </p>
                  <ol>
                    {selectedRecipe.pasos.split('\n').map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="recipe-actions">
                <button className="btn btn-primary"
                  onClick={() => window.print()}
                  title="Imprimir receta">
                  <i className="bi bi-printer-fill"></i>
                </button>
                <a
                  className="btn btn-secondary"
                  href={`mailto:?subject=Receta: ${selectedRecipe.titulo}&body=Hola,%0D%0A%0D%0ATe comparto esta receta que creé con la aplicación mamma mIA:%0D%0A%0D%0ATítulo: ${selectedRecipe.titulo}%0D%0ADescripción: ${selectedRecipe.descripcion}%0D%0AIngredientes:%0D%0A${selectedRecipe.ingredients.replace(
                    /\n/g,
                    '%0D%0A'
                  )}%0D%0APasos:%0D%0A${selectedRecipe.pasos.replace(/\n/g, '%0D%0A')}%0D%0ADisfruta la receta!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Enviar receta por email"
                >
                  <i className="bi bi-envelope-fill"></i>
                </a>
                <button
                  onClick={() => handleDelete(selectedRecipe.id)}
                  className="btn btn-danger"
                  title="Eliminar receta"
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SavedRecipes;

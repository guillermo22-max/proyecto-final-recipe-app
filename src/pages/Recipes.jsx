import { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { generateRecipeWithAI, chatWithAI } from '../services/aiService';
import '../styles/recipes.css';
import Footer from '../components/layout/Footer';
import RandomIcon from '../components/RandomIcon.jsx';
import api from '../services/api';
import UserContext from '../context/UserContext';
import LoginModal from '../components/modals/LoginModal';
import RegistrationModal from '../components/modals/RegistrationModal';

function Recipes() {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecipe, setAiRecipe] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);
  const [showChef, setShowChef] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type, message: '' }), 2000);
  };

  const handleSearchAI = async () => {
    if (!user) {
      if (!hasSearchedOnce) {
        setHasSearchedOnce(true);
      } else {
        setShowLoginModal(true);
        return;
      }
    }

    setLoading(true);
    setError('');
    setAiRecipe('');
    setSearchQuery('');

    try {
      const recipe = await generateRecipeWithAI(searchQuery);
      setAiRecipe(recipe);
    } catch (err) {
      setError('Error al generar la receta con IA');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const parsedRecipe = aiRecipe && aiRecipe.description ? JSON.parse(aiRecipe.description) : null;

  const saveRecipe = async () => {
    if (!parsedRecipe) {
      showAlert('danger', 'La receta no está disponible');
      return;
    }

    const recipeData = {
      titulo: parsedRecipe.name,
      ingredients: parsedRecipe.ingredients.join('\n'),
      descripcion: parsedRecipe.description,
      pasos: parsedRecipe.steps.join('\n'),
      calorias: parsedRecipe.calories,
      foto_url: parsedRecipe.image,
      nutrientes: parsedRecipe.nutritional_values.join('\n'),
      tiempo_elaboracion: parsedRecipe.prep_time,
    };

    try {
      const response = await api.post('/recipe/save', recipeData);
      if (response.status === 200) {
        showAlert('success', 'Receta guardada con éxito');
      } else {
        showAlert('success', 'Receta guardada con éxito');
      }
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      showAlert('danger', 'Error al guardar la receta');
    }
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    setShowRegistrationModal(true);
  };

  const handleChatWithAI = async () => {
    if (!user) {
      if (!hasSearchedOnce) {
        setHasSearchedOnce(true);
      } else {
        showAlert('warning', 'Inicia sesión o registrate para continuar utilizando la app');
        setTimeout(() => {
          setShowLoginModal(true);
        }, 1500);
        return;
      }
    }
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const newMessage = { role: 'user', content: searchQuery };
      const updatedChatHistory = [...chatHistory, newMessage];
      const response = await chatWithAI(updatedChatHistory, searchQuery.trim());

      const aiMessage = { role: 'assistant', content: response };
      setChatHistory([...updatedChatHistory, aiMessage]);
    } catch (err) {
      setError('Error al obtener respuesta de la IA');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showGenerateRecipe = () => {
    setShowChef(!showChef);
    setShowChat(false);
  }

  const showChatWithAssistant = () => {
    setShowChat(!showChat)
    setShowChef(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showChef) handleSearchAI();
      if (showChat) handleChatWithAI();
      setSearchQuery('');
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="w-100 content oswald-text">


          <div className="d-flex flex-column">
            {alert.show && (
              <div
                className="alert-overlay"
                onClick={() => setAlert({ show: false, type: '', message: '' })}
              >
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              </div>
            )}
            <h1 className="my-4 text-center">¿Qué cocinamos hoy?</h1>
            <h3 className="text-center">¿Quieres generar una receta o preguntar a nuestro ayudante de cocina?</h3>
            <div className="d-flex justify-content-center gap-2 my-3">
              <div className="d-flex flex-column align-items-center gap-2">
                <img className="img-chef" src="/chef.png" alt="chef-avatar" />
                <button className="button-yellow"
                  onClick={showGenerateRecipe}
                >Generar receta
                </button>
              </div>
              <div className="d-flex flex-column align-items-center gap-2">
                <img className="img-chef" src="/asistente.png" alt="asistant-avatar" />
                <button className="button-yellow"
                  onClick={showChatWithAssistant}
                >Asistente
                </button>
              </div>
            </div>
            {showChef && (
              <div>
                <div className="d-flex justify-content-end align-items-center mb-4">
                  <p className="conversation me-3 my-auto">
                    ¡Hola! Dime que tienes en la nevera o que plato tienes en mente. Puedo generarte una receta genial en segundos. ¡Haz la prueba!
                  </p>
                  <img
                    className="img-chef me-4"
                    src="/chef.png"
                    alt="ai-chef"
                  />
                </div>
                <div className="d-flex justify-content-start align-items-center mb-4">
                  <img
                    className="img-usuario mx-4"
                    src="/usuario.png"
                    alt="ai-chef"
                  />
                  <div className="mb-4 own-conversation">
                    <textarea
                      type="text"
                      className="form-control mb-4"
                      placeholder="Ingresa tus ingredientes o un plato"
                      value={searchQuery}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    ></textarea>
                    <div className="recipe-generate-button">
                      <button
                        className="button-green w-25"
                        onClick={handleSearchAI}
                        disabled={loading || !searchQuery.trim()}
                        title="Generar receta"
                      >
                        {loading ? <div className="spinner-border" role="status">
                          <span className="oswald-text visually-hidden">Cargando...</span>
                          <span role="status"></span>
                        </div> : <i className="bi bi-send-fill"></i>}
                      </button>
                      {error && <p className="text-danger mt-2">{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showChat && (
              <div>
                <div className="d-flex justify-content-end align-items-center mb-4">
                  <p className="oswald-text conversation me-3 my-auto">
                    ¿Tienes alguna duda sobre técnicas de cocina, utensilios, cortes, o cualquier tema relacionado con la cocina? ¡No dudes en preguntarme, estaré encantado de ayudarte!
                  </p>
                  <img
                    className="img-chef me-4"
                    src="/asistente.png"
                    alt="ai-chef"
                  />
                </div>
                <div className="chat-history px-3 pb-3">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`d-flex align-items-center mb-2 ${msg.role === 'user' ? 'justify-content-start' : 'justify-content-end'}`}
                    >
                      {msg.role === 'user' && (
                        <img className="img-usuario me-4" src="/usuario.png" />
                      )}

                      <p className={`conversation my-4 ${msg.role === 'user' ? 'text-primary' : 'me-3 my-auto text-dark'}`}>
                        <strong>{msg.role === 'user' ? 'Tú' : 'Asistente de cocina'}</strong>
                        <br />
                        {msg.content}
                      </p>

                      {msg.role !== 'user' && (
                        <img className="img-chef ms-4" src="/asistente.png" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-start align-items-center mb-4">
                  <img
                    className="img-usuario mx-4"
                    src="/usuario.png"
                    alt="ai-chef"
                  />
                  <div className="mb-4 own-conversation">
                    <textarea
                      type="text"
                      className="form-control mb-4"
                      placeholder="Ejemplo: ¿Qué es un sifón de cocina?"
                      value={searchQuery}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    ></textarea>
                    <div className="recipe-generate-button">
                      <button className="button-green w-25"

                        onClick={handleChatWithAI} disabled={loading || !searchQuery.trim()}
                        title="Preguntar a la IA">

                        {loading ? <div className="spinner-border" role="status">
                          <span className="visually-hidden">Cargando...</span>
                          <span role="status"></span>
                        </div> : <i className="bi bi-send-fill"></i>}
                      </button>
                      {error && <p className="text-danger mt-2">{error}</p>}
                      <button className="button-red ms-1"
                      title="Borrar chat"
                      onClick={() => setChatHistory([])}>
                      <i className="bi bi-eraser-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {loading ? (
            <div className="loading-container text-center">
              <RandomIcon />
              {showChef && (
                <p className="mt-3">Generando receta...</p>
              )}
              {showChat && (
                <p className="mt-3">Pensando...</p>
              )}
            </div>
          ) : (
            parsedRecipe && (
              <div className="recipe-card-horizontal">
                <div className="recipe-title">
                  <h1 className="recipe-title fs-1 text-center">{parsedRecipe.name}</h1>
                </div>
                <div className="recipe-header">
                  <div className="d-flex flex-column w-50">
                    <img
                      className="recipe-image mb-4"
                      src={parsedRecipe.image}
                      alt="foto-receta"
                    />
                  </div>
                  <div className="recipe-info w-50 my-auto">
                    <p>{parsedRecipe.description}</p>
                  </div>
                </div>
                <div className="recipe-header flex-wrap">
                  <div>
                    <p><strong>Valores nutricionales:</strong></p>
                    <ul>
                      {parsedRecipe.nutritional_values.map((e, index) => (
                        <li key={index}>{e}</li>
                      ))}
                    </ul>
                  </div>

                  <p><strong>Calorías:</strong> {parsedRecipe.calories || 'No especificadas'}</p>
                  <p><strong>Tiempo de preparación:</strong> {parsedRecipe.prep_time || 'No especificado'}</p>
                </div>
                <div className="recipe-content">
                  <div className="recipe-section">
                    <p><strong>Ingredientes:</strong></p>
                    <ul>
                      {parsedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="recipe-section">
                    <p><strong>Pasos:</strong></p>
                    <ol>
                      {parsedRecipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="recipe-actions d-flex justify-content-end mt-2">
                  <button
                    className="button-peach"
                    onClick={saveRecipe}
                    title="Guardar receta"
                  >
                    <i className="bi bi-floppy-fill"></i>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />


      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegisterClick={handleRegisterClick}
      />

      {/* Modal de Registro */}
      <RegistrationModal
        show={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
}

export default Recipes;
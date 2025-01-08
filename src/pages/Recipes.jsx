import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { generateRecipeWithAI } from '../services/aiService';

function Recipes() {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el texto del buscador
  const [aiRecipe, setAiRecipe] = useState(null); // Estado para la receta generada por IA
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Estado para ver una receta en detalle
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(''); // Estado de errores

  /**
   * 📌 Manejar la búsqueda de una receta con IA
   */
  const handleSearchAI = async () => {
    setLoading(true);
    setError('');
    setAiRecipe(null); // Limpiar la receta anterior
    setSelectedRecipe(null); // Salir del modo de receta seleccionada

    try {
      const recipe = await generateRecipeWithAI(searchQuery);

      setAiRecipe({
        name: searchQuery,
        description: recipe.description,
        image: recipe.image || 'https://via.placeholder.com/300',
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || '',
        calories: recipe.calories || '',
        prep_time: recipe.prep_time || ''
      });
    } catch (err) {
      setError('Error al generar la receta con IA');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📌 Mostrar detalles de la receta seleccionada
   */
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  /**
   * 📌 Volver al buscador desde la vista de detalles
   */
  const handleBackToSearch = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2 className="mb-4">Crear Receta con IA</h2>

        {/* 📌 Buscador */}
        {!selectedRecipe && (
          <div className="mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Escribe el nombre de la receta que deseas crear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearchAI}
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? 'Buscando...' : 'Buscar Receta'}
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        )}

        {/* 📌 Resultado de la búsqueda */}
        {aiRecipe && !selectedRecipe && (
          <div className="text-center mt-4">
            <h3>{aiRecipe.name}</h3>
            <img
              src={aiRecipe.image}
              alt={aiRecipe.name}
              className="img-fluid rounded mb-3"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRecipeClick(aiRecipe)}
            />
            <p><strong>Descripción:</strong> {aiRecipe.description}</p>
          </div>
        )}

        {/* 📌 Vista Detallada de la Receta */}
        {selectedRecipe && (
          <div className="mt-4">
            <button className="btn btn-outline-secondary mb-3" onClick={handleBackToSearch}>
              Volver a la búsqueda
            </button>
            <h3>{selectedRecipe.name}</h3>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="img-fluid rounded mb-3"
            />
            <p><strong>Descripción:</strong> {selectedRecipe.description}</p>
            <p><strong>Ingredientes:</strong> {selectedRecipe.ingredients?.join(', ') || 'No especificados'}</p>
            <p><strong>Pasos:</strong> {selectedRecipe.steps || 'No especificados'}</p>
            <p><strong>Calorías:</strong> {selectedRecipe.calories || 'No especificadas'}</p>
            <p><strong>Tiempo de preparación:</strong> {selectedRecipe.prep_time || 'No especificado'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;






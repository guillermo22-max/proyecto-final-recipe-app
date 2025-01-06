import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';

function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulación de la IA llamando a una API
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulando una llamada a la API (reemplaza con tu endpoint real)
      const response = await fetch(`https://api.example.com/ai/recipes?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error al obtener la receta de la IA');
      }
      const data = await response.json();
      setRecipeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToSearch = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2 className="mb-4">Crear receta</h2>
        
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
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? 'Buscando...' : 'Buscar Receta'}
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        )}

        {/* 📌 Resultado de la búsqueda */}
        {recipeData && !selectedRecipe && (
          <div className="text-center mt-4">
            <h3>{recipeData.name}</h3>
            <img
              src={recipeData.image || 'https://via.placeholder.com/300'}
              alt={recipeData.name}
              className="img-fluid rounded mb-3"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRecipeClick(recipeData)}
            />
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
              src={selectedRecipe.image || 'https://via.placeholder.com/300'}
              alt={selectedRecipe.name}
              className="img-fluid rounded mb-3"
            />
            <p><strong>Descripción:</strong> {selectedRecipe.description || 'Sin descripción'}</p>
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



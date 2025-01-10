// import { useState } from 'react';
// import Sidebar from '../components/layout/Sidebar';
// import { generateRecipeWithAI } from '../services/aiService';

// function Recipes() {
//   const [searchQuery, setSearchQuery] = useState(''); // Estado para el texto del buscador
//   const [aiRecipe, setAiRecipe] = useState(null); // Estado para la receta generada por IA
//   const [selectedRecipe, setSelectedRecipe] = useState(null); // Estado para ver una receta en detalle
//   const [loading, setLoading] = useState(false); // Estado de carga
//   const [error, setError] = useState(''); // Estado de errores

//   /**
//    * 📌 Manejar la búsqueda de una receta con IA
//    */
//   const handleSearchAI = async () => {
//     setLoading(true);
//     setError('');
//     setAiRecipe(null); // Limpiar la receta anterior
//     setSelectedRecipe(null); // Salir del modo de receta seleccionada

//     try {
//       const recipe = await generateRecipeWithAI(searchQuery);
//       console.log(recipe)
//       setAiRecipe({
//         name: searchQuery,
//         description: recipe.description,
//         image: recipe.image || 'https://via.placeholder.com/300',
//         ingredients: recipe.ingredients || [],
//         steps: recipe.steps || '',
//         calories: recipe.calories || '',
//         prep_time: recipe.prep_time || ''
//       });
//       console.log(aiRecipe)
//     } catch (err) {
//       setError('Error al generar la receta con IA');
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * 📌 Mostrar detalles de la receta seleccionada
//    */
//   const handleRecipeClick = (recipe) => {
//     setSelectedRecipe(recipe);
//   };

//   /**
//    * 📌 Volver al buscador desde la vista de detalles
//    */
//   const handleBackToSearch = () => {
//     setSelectedRecipe(null);
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="container my-5">
//         <h2 className="mb-4">¿Qué tengo en la nevera?</h2>

//         {/* 📌 Buscador */}
//         {!selectedRecipe && (
//           <div className="mb-4">
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Ejemplo: pollo, zanahorias y patatas"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               className="btn btn-success mt-2"
//               onClick={handleSearchAI}
//               disabled={loading || !searchQuery.trim()}
//             >
//               {loading ? 'Buscando...' : 'Buscar Receta'}
//             </button>
//             {error && <p className="text-danger mt-2">{error}</p>}
//           </div>
//         )}

//         {/* 📌 Resultado de la búsqueda */}
//         {aiRecipe && !selectedRecipe && (
//           <div className="text-center mt-4">
//             <h3>{aiRecipe.name}</h3>
//             <img
//               src={aiRecipe.image}
//               alt={aiRecipe.name}
//               className="img-fluid rounded mb-3"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleRecipeClick(aiRecipe)}
//             />
//             <p><strong>Descripción:</strong> {aiRecipe.description}</p>
//           </div>
//         )}

//         {/* 📌 Vista Detallada de la Receta */}
//         {selectedRecipe && (
//           <div className="mt-4">
//             <button className="btn btn-outline-secondary mb-3" onClick={handleBackToSearch}>
//               Volver a la búsqueda
//             </button>
//             <h3>{selectedRecipe.name}</h3>
//             <img
//               src={selectedRecipe.image}
//               alt={selectedRecipe.name}
//               className="img-fluid rounded mb-3"
//             />
//             <p><strong>Descripción:</strong> {selectedRecipe.description}</p>
//             <p><strong>Ingredientes:</strong> {selectedRecipe.ingredients?.join(', ') || 'No especificados'}</p>
//             <p><strong>Pasos:</strong> {selectedRecipe.steps || 'No especificados'}</p>
//             <p><strong>Calorías:</strong> {selectedRecipe.calories || 'No especificadas'}</p>
//             <p><strong>Tiempo de preparación:</strong> {selectedRecipe.prep_time || 'No especificado'}</p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Recipes;


import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { generateRecipeWithAI } from '../services/aiService';
import '../styles/recipes.css'

function Recipes() {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el texto del buscador
  const [aiRecipe, setAiRecipe] = useState(''); // Estado para la receta generada por IA
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(''); // Estado de errores

  /**
   * Manejar la generación de la receta
   */
  const handleSearchAI = async () => {
    setLoading(true);
    setError('');
    setAiRecipe(''); // Limpiar la receta anterior
    setSearchQuery('');

    try {
      const recipe = await generateRecipeWithAI(searchQuery);
      setAiRecipe(recipe);
    } catch (err) {
      setError('Error al generar la receta con IA');
    } finally {
      setLoading(false);
    }
  };

  const parsedRecipe = aiRecipe?.description ? JSON.parse(aiRecipe.description) : null;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100 content">
        <h2 className="mt-2 mb-4 text-center">¿Qué cocinamos hoy?</h2>
        {/* Buscador */}
        <div>
          <div className="d-flex justify-content-end align-items-center mb-4">
            <p className="conversation me-3 my-auto">¡Hola! ¿Con qué ingredientes cocinamos hoy? Puedo prepararte una receta genial en segundos. ¡Haz la prueba!</p>
            <img className="img-chef me-4" src="https://cdn.pixabay.com/photo/2024/08/20/13/12/ai-generated-8983262_960_720.jpg" alt="ai-chef" />
          </div>
          <div className="mb-4 mx-4 own-conversation">
            <textarea
              type="text"
              className="form-control mb-4"
              placeholder="Ejemplo: pollo, zanahorias y patatas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></textarea>
            <button
              className="btn btn-success"
              onClick={handleSearchAI}
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? 'Generando...' : 'Generar Receta'}
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </div>
        {/* Resultado de la receta */}
        {aiRecipe && (
          <div class="recipe-card">
            <h3 class="recipe-title">{parsedRecipe.name}</h3>

            <div class="recipe-section">
              <p><strong>Descripción:</strong> {parsedRecipe.description}</p>
            </div>

            <div class="recipe-section">
              <p><strong>Ingredientes:</strong></p>
              <ul>
                {parsedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                )) || '<li>No especificados</li>'}
              </ul>
            </div>

            <div class="recipe-section">
              <p><strong>Pasos:</strong></p>
              <ol>
                {parsedRecipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                )) || '<li>No especificados</li>'}
              </ol>
            </div>
            <div class="recipe-section">
              <p><strong>Valores nutricionales:</strong></p>
              <ol>
                {parsedRecipe.nutritional_values.map((e, index) => (
                  <li key={index}>{e}</li>
                )) || '<li>No especificados</li>'}
              </ol>
            </div>
            <div class="recipe-section">
              <div className="d-flex justify-content-between">
                <p><strong>Calorías:</strong> {parsedRecipe.calories || 'No especificadas'}</p>
                <p><strong>Tiempo de preparación:</strong> {parsedRecipe.prep_time || 'No especificado'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;




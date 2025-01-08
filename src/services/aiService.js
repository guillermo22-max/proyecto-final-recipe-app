import api from './api';

/**
 * Genera una receta usando la API de IA.
 * @param {string} prompt - La descripción de la receta que el usuario quiere crear.
 * @returns {Promise<Object>} - Retorna los datos de la receta generada.
 * @throws {Error} - Lanza un error si falla la solicitud.
 */
export const generateRecipeWithAI = async (prompt) => {
  try {
    const response = await api.post('/ai/generate', { prompt });
    return {
      name: prompt,
      description: response.data.recipe,
      image: response.data.image || 'https://via.placeholder.com/300',
      ingredients: response.data.ingredients || [],
      steps: response.data.steps || '',
      calories: response.data.calories || '',
      prep_time: response.data.prep_time || '',
    };
  } catch (error) {
    console.error('Error al generar la receta con IA:', error);
    throw new Error('Error al generar la receta con IA');
  }
};


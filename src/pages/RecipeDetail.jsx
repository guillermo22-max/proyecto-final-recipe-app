import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api.js';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecipeDetail = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/recipe/${id}`);
            setRecipe(response.data);
        } catch (err) {
            setError('Error al cargar los detalles de la receta.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta receta?');
        if (!confirmDelete) return;
    
        try {
            await api.delete(`/recipe/${id}`);
            navigate('/saved-recipes');
        } catch (err) {
            console.error('Error al eliminar la receta:', err);
            setError('Error al eliminar la receta. Intenta nuevamente.');
        }
    };

    useEffect(() => {
        fetchRecipeDetail();
    }, [id]);

    console.log(recipe);
    return (
        <div>
            <Sidebar />
            <div className="recipe-detail w-100 content">
                {loading ? (
                    <p>Cargando receta...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <div className="w-100">
                        <h2>{recipe.titulo}</h2>
                        <p><strong>Descripción:</strong> {recipe.descripcion}</p>
                        <p><strong>Pasos:</strong></p>
                        <ul>
                            {recipe.pasos.split('\n').map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                        <p><strong>Ingedientes:</strong></p>
                        <ul>
                            {recipe.ingredients.split('\n').map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Calorías:</strong> {recipe.calorias}</p>
                        <p><strong>Tiempo de elaboración:</strong> {recipe.tiempo_elaboracion}</p>
                        <button
                            onClick={() => navigate('/saved-recipes')}
                            className="btn btn-success mt-4"
                        >Volver a recetas guardadas
                        </button>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger mt-4 me-2"
                        >
                            Eliminar Receta
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetail;

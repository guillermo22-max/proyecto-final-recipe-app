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
                    <div>
                        <h2>{recipe.titulo}</h2>
                        <p><strong>Descripción:</strong> {recipe.descripcion}</p>
                        <p><strong>Pasos:</strong></p>
                        <ul>
                            {recipe.pasos.split('\n').map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                        <p><strong>Ingedientes:</strong> {recipe.ingredients}</p>
                        <p><strong>Calorías:</strong> {recipe.calorias}</p>
                        <p><strong>Tiempo de elaboración:</strong> {recipe.tiempo_elaboracion}</p>
                        <button
                            onClick={() => navigate('/saved-recipes')}
                            className="btn btn-success mt-4"
                        >Volver a recetas guardadas
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetail;

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api.js';
import Footer from '../components/layout/Footer.jsx';

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
            <div className="recipe-detail content">
                {loading ? (
                    <p>Cargando receta...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <div>
                        <div className="recipe-card-horizontal">
                            <div className="recipe-title">
                                <h1 className="recipe-title fs-1 text-center">{recipe.titulo}</h1>
                            </div>
                            <div className="recipe-header">
                                <div className="d-flex flex-column w-50">
                                    <img className="recipe-image mb-4" src={recipe.foto_url} alt="foto-receta" />
                                </div>
                                <div className="recipe-info w-50 my-auto">
                                    <p>{recipe.descripcion}</p>
                                </div>
                            </div>
                            <div className="recipe-header flex-wrap">
                                <div>
                                    <p><strong>Valores nutricionales:</strong></p>
                                    <ul>
                                        {recipe.nutrientes.split('\n').map((e, index) => (
                                            <li key={index}>{e}</li>
                                        )) || '<li>No especificados</li>'}
                                    </ul>
                                </div>

                                <p><strong>Calorías:</strong> {recipe.calorias || 'No especificadas'}</p>
                                <p><strong>Tiempo de preparación:</strong> {recipe.tiempo_elaboracion || 'No especificado'}</p>

                            </div>
                            <div className="recipe-content">
                                <div className="recipe-section">
                                    <p><strong>Ingredientes:</strong></p>
                                    <ul>
                                        {recipe.ingredients.split('\n').map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        )) || '<li>No especificados</li>'}
                                    </ul>
                                </div>

                                <div className="recipe-section">
                                    <p><strong>Pasos:</strong></p>
                                    <ol>
                                        {recipe.pasos.split('\n').map((step, index) => (
                                            <li key={index}>{step}</li>
                                        )) || '<li>No especificados</li>'}
                                    </ol>
                                </div>
                            </div>
                            <div className="recipe-actions">
                                <button className="btn btn-primary"
                                    onClick={() => window.print()}
                                    title="Imprimir receta">
                                    <i class="bi bi-printer-fill"></i>
                                </button>
                                <a
                                    className="btn btn-secondary"
                                    href={`mailto:?subject=Receta: ${recipe.titulo}&body=Hola,%0D%0A%0D%0ATe comparto esta receta que creé con la aplicación mamma mIA:%0D%0A%0D%0ATítulo: ${recipe.titulo}%0D%0ADescripción: ${recipe.descripcion}%0D%0AIngredientes:%0D%0A${recipe.ingredients.replace(
                                        /\n/g,
                                        '%0D%0A'
                                    )}%0D%0APasos:%0D%0A${recipe.pasos.replace(/\n/g, '%0D%0A')}%0D%0ADisfruta la receta!`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Enviar receta por email"
                                >
                                    <i class="bi bi-envelope-fill"></i>
                                </a>
                                <button
                                    onClick={() => handleDelete(recipe.id)}
                                    className="btn btn-danger"
                                    title="Eliminar receta"
                                >
                                    <i class="bi bi-trash3-fill"></i>
                                </button>
                                <button
                                    onClick={() => navigate(`/saved-recipes`)}
                                    className="btn btn-success"
                                    title="Volver a recetas guardadas"
                                >
                                    <i class="bi bi-arrow-return-left"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default RecipeDetail;

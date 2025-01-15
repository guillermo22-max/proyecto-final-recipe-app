import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/mealPlan.css'


const MealPlan = () => {
  const [recipes, setRecipes] = useState([]); // Recetas guardadas
  const [mealPlan, setMealPlan] = useState({}); // Plan semanal

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const meals = ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'];

  const fetchSavedRecipes = async () => {
    try {
      const response = await api.get('/recipe/saved');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error al cargar recetas:', err);
    }
  };

  const handleDrop = (day, meal, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [`${day}-${meal}`]: recipe,
    }));
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Sidebar />
      <div className="meal-plan content">
        <h2 className="text-center my-4">Plan Semanal de Comidas</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              {daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal}>
                <td><strong>{meal}</strong></td>
                {daysOfWeek.map((day) => (
                  <td
                    key={`${day}-${meal}`}
                    onDrop={(e) => {
                      const recipe = JSON.parse(e.dataTransfer.getData('recipe'));
                      handleDrop(day, meal, recipe);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className="meal-cell"
                  >
                    {mealPlan[`${day}-${meal}`] ? (
                      <div className="meal-item">
                        <strong>{mealPlan[`${day}-${meal}`].titulo}</strong>
                        <p>Calorias: {mealPlan[`${day}-${meal}`].calorias}</p>
                      </div>
                    ) : (
                      <p className="text-muted">Arrastra aquí una receta</p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="my-4">Recetas Guardadas</h3>
        <div className="d-flex align-items-center justify-content-center">
          <Slider {...sliderSettings} className="meal-slider">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="meal-card"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('recipe', JSON.stringify(recipe))}
              >
                <h4>{recipe.titulo}</h4>
                <p>Calorías: {recipe.calorias}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;

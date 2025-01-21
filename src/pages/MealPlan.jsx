
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api.js';

import '../styles/mealPlan.css';
import { useNavigate } from 'react-router-dom';

const MealPlan = () => {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [expandedColumns, setExpandedColumns] = useState({});  // Estado para controlar las columnas expandidas
  const navigate = useNavigate();

  const daysOfWeek = ['Lunes ▼', 'Martes ▼', 'Miércoles ▼', 'Jueves ▼', 'Viernes ▼'];
  const meals = ['Desayuno', 'Comida', 'Cena'];

  const fetchSavedRecipes = async () => {
    try {
      const response = await api.get('/recipe/saved');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error al cargar recetas:', err);
    }
  };

  const handleDrop = (day, meal, recipe, sourceKey) => {
    setMealPlan((prev) => {
      const updatedPlan = { ...prev };
      if (sourceKey) {
        delete updatedPlan[sourceKey];
      }
      updatedPlan[`${day}-${meal}`] = recipe;
      localStorage.setItem('mealPlan', JSON.stringify(updatedPlan));
      return updatedPlan;
    });
  };

  const handleRemove = (day, meal) => {
    setMealPlan((prev) => {
      const updatedPlan = { ...prev };
      delete updatedPlan[`${day}-${meal}`];
      localStorage.setItem('mealPlan', JSON.stringify(updatedPlan));
      return updatedPlan;
    });
  };

  const handleDragStart = (e, recipe, sourceKey) => {
    e.dataTransfer.setData('recipe', JSON.stringify(recipe));
    e.dataTransfer.setData('sourceKey', sourceKey);
  };

  const toggleColumn = (day) => {
    setExpandedColumns((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  useEffect(() => {
    fetchSavedRecipes();

    const savedMealPlan = JSON.parse(localStorage.getItem('mealPlan'));
    if (savedMealPlan) {
      setMealPlan(savedMealPlan);
    }
  }, []);


  console.log(recipes['0']);

  return (
    <div>
      <Sidebar />
      <div className="meal-plan content">
        <h2 className="text-center my-4">Plan Semanal de Comidas</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="bg-opacity-0"></th>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="text-center"
                  onClick={() => toggleColumn(day)}
                  style={{ cursor: 'pointer' }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal}>
                <td className="day-cell text-center"><strong className="day-text">{meal}</strong></td>
                {daysOfWeek.map((day) => (
                  <td
                    key={`${day}-${meal}`}
                    className={`meal-cell ${expandedColumns[day] ? 'expanded' : ''}`}
                    onDrop={(e) => {
                      const recipe = JSON.parse(e.dataTransfer.getData('recipe'));
                      const sourceKey = e.dataTransfer.getData('sourceKey');
                      handleDrop(day, meal, recipe, sourceKey);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {expandedColumns[day] && mealPlan[`${day}-${meal}`] ? (
                      <div
                        className="d-flex flex-column justify-content-between align-items-center text-center"
                        draggable
                        onDragStart={(e) => handleDragStart(e, mealPlan[`${day}-${meal}`], `${day}-${meal}`)}
                      >
                        <div
                          className="recipe-card-meal-plan text-light"
                          style={{
                            backgroundImage: `url(${mealPlan[`${day}-${meal}`].foto_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px',
                          }}
                        >
                          <div className="content-meal-table d-flex flex-column justify-content-between h-100 p-2">
                            <strong>{mealPlan[`${day}-${meal}`].titulo}</strong>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="my-auto">{mealPlan[`${day}-${meal}`].calorias} Calorías</p>
                              <i
                                className="trash-icon bi bi-trash my-auto text-light bg-danger rounded h6 p-1 ms-2"
                                onClick={() => handleRemove(day, meal)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : expandedColumns[day] ? (
                      <p className="text-muted text-center h-100 m-0 d-flex justify-content-center align-items-center">
                        <i className="bi bi-plus-square-dotted"></i>
                      </p>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>


        {/* <table className="table">
          <thead>
            <tr>
              <th></th>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="text-center"
                  onClick={() => toggleColumn(day)}
                  style={{ cursor: 'pointer' }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal}>
                <td className="day-cell text-center"><strong className="day-text">{meal}</strong></td>
                {daysOfWeek.map((day) => (
                  <td
                    key={`${day}-${meal}`}
                    className="meal-cell"
                    style={{
                      // visibility: expandedColumns[day] ? 'visible' : 'collapse',
                      display: expandedColumns[day] ? 'table-cell' : 'none',
                    }}
                    onDrop={(e) => {
                      const recipe = JSON.parse(e.dataTransfer.getData('recipe'));
                      const sourceKey = e.dataTransfer.getData('sourceKey');
                      handleDrop(day, meal, recipe, sourceKey);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {mealPlan[`${day}-${meal}`] ? (
                      <div
                        className="d-flex flex-column justify-content-between align-items-center text-center"
                        draggable
                        onDragStart={(e) => handleDragStart(e, mealPlan[`${day}-${meal}`], `${day}-${meal}`)}
                      >
                        <div
                          className="recipe-card-meal-plan text-light"
                          style={{
                            backgroundImage: `url(${mealPlan[`${day}-${meal}`].foto_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px', // Ajusta la altura según sea necesario
                          }}
                        >
                          <div className="content-meal-table d-flex flex-column justify-content-between h-100 p-2">
                            <strong>{mealPlan[`${day}-${meal}`].titulo}</strong>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="my-auto">{mealPlan[`${day}-${meal}`].calorias} Calorías</p>
                              <i
                                className="trash-icon bi bi-trash my-auto text-light bg-danger rounded h6 p-1 ms-2"
                                onClick={() => handleRemove(day, meal)}
                              ></i>
                            </div>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <p className="text-muted text-center h-100 m-0 d-flex justify-content-center align-items-center">
                        <i className="bi bi-plus-square-dotted"></i>
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}

        <h3 className="my-4">Recetas Guardadas</h3>
        <div>
          <div className="d-flex flex-row justify-content-evenly align-items-center gap-3 flex-wrap">
            {recipes.map((recipe) => (

              <div key={recipe.id} className="recipe-card-meal-plan" style={{ backgroundImage: `url(${recipe.foto_url})`, width: '200px', height: '200px' }}>
                <div className="recipe-content-meal-plan h-100 d-flex flex-column justify-content-between"
                  onDragStart={(e) => handleDragStart(e, recipe)}
                  draggable="true">
                  <div className="recipe-content-meal-plan d-flex flex-column justify-content-between">
                    <h3 className="text-center w-100">{recipe.titulo}</h3>
                    <div className="m-0">
                      <p><strong>Calorías:</strong> {recipe.calorias}</p>
                    </div>
                    <div className="d-flex justify-content-end align-items-center w-100">
                      <button
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                        className="btn btn-success"
                        title="Ver receta completa"
                      ><i className="bi bi-eye-fill"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id)}
                        className="btn btn-danger"
                        title="Eliminar receta"
                      ><i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;

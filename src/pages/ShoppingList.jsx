
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import '../styles/shoppingList.css';
import api from '../services/api';

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [recipes, setRecipes] = useState([]);

  const [ingredients] = useState([
    'Manzana', 'Plátano', 'Naranja', 'Fresa', 'Arándanos', 'Melocotón', 'Piña', 'Sandía',
    'Mango', 'Kiwi', 'Pera', 'Uva', 'Limón', 'Cereza', 'Frambuesa', 'Melón', 'Higo', 'Guayaba',
    'Papaya', 'Granada', 'Pomelo', 'Mandarina', 'Lima', 'Coco', 'Chirimoya', 'Maracuyá', 'Aguacate',
    'Espinaca', 'Lechuga', 'Col', 'Col rizada', 'Brócoli', 'Zanahoria', 'Pepino', 'Calabacín',
    'Pimiento rojo', 'Pimiento verde', 'Pimiento amarillo', 'Berenjena', 'Champiñones', 'Setas',
    'Patata', 'Batata', 'Cebolla', 'Ajo', 'Jengibre', 'Nabo', 'Rábano', 'Calabaza', 'Remolacha',
    'Apio', 'Perejil', 'Cilantro', 'Albahaca', 'Orégano', 'Tomillo', 'Romero', 'Salvia', 'Eneldo',
    'Laurel', 'Anís', 'Canela', 'Clavo', 'Pimienta negra', 'Pimienta blanca', 'Pimentón', 'Cúrcuma',
    'Comino', 'Semillas de hinojo', 'Mostaza', 'Cilantro molido', 'Cardamomo', 'Curry en polvo',
    'Chile en polvo', 'Especias para barbacoa', 'Especias italianas', 'Especias marroquíes',
    'Harina de trigo', 'Harina integral', 'Harina de avena', 'Harina de almendra', 'Harina de maíz',
    'Harina de arroz', 'Harina de coco', 'Azúcar blanco', 'Azúcar moreno', 'Miel', 'Jarabe de arce',
    'Aceite de oliva', 'Aceite de girasol', 'Aceite de coco', 'Vinagre de manzana', 'Vinagre balsámico',
    'Leche', 'Leche de almendra', 'Leche de soja', 'Leche de coco', 'Leche de avena', 'Yogur',
    'Queso', 'Mantequilla', 'Nata', 'Huevos', 'Carne de res', 'Carne de cerdo', 'Carne de pollo',
    'Carne de cordero', 'Pescado', 'Mariscos', 'Camarones', 'Calamares', 'Mejillones', 'Almejas',
    'Salmón', 'Atún', 'Bacalao', 'Trucha', 'Pan', 'Pan integral', 'Pan de centeno', 'Pan de maíz',
    'Pasta', 'Arroz', 'Quinoa', 'Cuscús', 'Lentejas', 'Garbanzos', 'Frijoles negros', 'Frijoles rojos',
    'Almendras', 'Nueces', 'Avellanas', 'Anacardos', 'Pistachos', 'Semillas de girasol', 'Semillas de calabaza',
    'Chocolate negro', 'Chocolate con leche', 'Cacao en polvo', 'Café', 'Té verde', 'Té negro',
    'Té de hierbas', 'Mermelada', 'Mantequilla de maní', 'Mantequilla de almendra', 'Salsa de tomate',
    'Mayonesa', 'Mostaza', 'Salsa de soja', 'Salsa barbacoa', 'Kétchup', 'Sopa de pollo', 'Sopa de verduras',
    'Sopa de tomate', 'Caldo de pollo', 'Caldo de verduras', 'Caldo de res', 'Fideos instantáneos',
    'Galletas', 'Bizcochos', 'Tortillas', 'Pizzas congeladas', 'Helado', 'Papas fritas', 'Snacks saludables',
    'Agua', 'Agua con gas', 'Refrescos', 'Jugo de naranja', 'Jugo de manzana', 'Jugo de uva', 'Jugo de piña',
    'Bebidas deportivas', 'Bebidas energéticas', 'Cerveza', 'Vino tinto', 'Vino blanco', 'Champán',
    'Jamón', 'Aceitunas', 'Chorizo', 'Lomo', 'Pavo', 'Ternera', 'Tomate', 'Sardinas', 'Boquerones',
    'Merluza', 'Salmón ahumado', 'Tortilla española', 'Morcilla', 'Turrón', 'Churros', 'Migas',
    'Gazpacho', 'Bacalao', 'Piquillos', 'Pimientos de Padrón', 'Almejas a la marinera', 'Revuelto de setas',
    'Judías verdes', 'Conejo', 'Sepia', 'Patatas bravas', 'Ensaladilla rusa', 'Pulpo', 'Montaditos', 'Judiones',
    'Longaniza', 'Cerveza', 'Vino rosado', 'Cordero lechal', 'Pollo', 'Jamón serrano', 'Salchichas'
  ]);


  const fetchSavedRecipes = async () => {
    try {
      const response = await api.get('/recipe/saved');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error al cargar recetas:', err);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
    const storedIngredients = localStorage.getItem('selectedIngredients');
    if (storedIngredients) {
      setSelectedIngredients(JSON.parse(storedIngredients));
    }
  }, []);

  // Guardar lista en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  const handleAddIngredient = (ingredient) => {
    setSelectedIngredients((prev) => [
      ...prev,
      { name: ingredient, quantity: '' },
    ]);
  };

  const handleQuantityChange = (e) => {
    setEditQuantity(e.target.value);
  };

  const handleUpdateQuantity = (index) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index].quantity = editQuantity;
    setSelectedIngredients(updatedIngredients);
    setEditIndex(null);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleUpdateQuantity(index);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditQuantity(selectedIngredients[index].quantity);
  };

  const handlePrint = () => {
    const list = selectedIngredients.map((item) =>
      `${item.name}: ${item.quantity || 'sin cantidad especificada'}`
    ).join('\n');
    console.log('Lista de Ingredientes:\n' + list);
    window.print();
  };

  const handleRemoveIngredient = (index) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecipeIngredients = (recipeIngredients) => {
    setSelectedIngredients((prev) => {
      // Evitar duplicados
      const newIngredients = recipeIngredients.filter((ingredient) =>
        !prev.some((item) => item.name === ingredient)
      );
      return [
        ...prev,
        ...newIngredients.map((ingredient) => ({ name: ingredient, quantity: '' })),
      ];
    });
    console.log(selectedIngredients)
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="content w-100 d-flex flex-column">
          <div className="flex-grow-1">
            <h1 className="text-center my-4">Lista de la Compra</h1>
            <div className="d-flex justify-content-between content-shopping-list">

              <div className="shopping-list w-50 p-4 border">
                <h3 className="text-center">Lista de ingredientes</h3>
                {selectedIngredients.length === 0 ? (
                  <p className="text-muted">Añade ingredientes a tu lista.</p>
                ) : (
                  <ul>
                    {selectedIngredients.map((item, index) => (
                      <li key={index} className="mb-2">
                        <strong>{item.name}</strong>
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editQuantity}
                            onChange={handleQuantityChange}
                            onKeyDown={(e) => handleKeyPress(e, index)}
                            className="ms-2"
                          />
                        ) : (
                          <div className="d-flex align-items-center ms-2">
                            <span
                              onClick={() => handleEditClick(index)}
                              className="me-2 cursor-pointer"
                              style={{ color: 'inherit' }}
                            >
                              {item.quantity === '' ? 'Añadir cantidad' : item.quantity}
                            </span>
                            <i
                              className="bi bi-trash-fill text-danger cursor-pointer"
                              onClick={() => handleRemoveIngredient(index)}
                            ></i>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <button className="btn me-2 mt-2"
                  onClick={handlePrint}
                  style={{ backgroundColor: '#F4A261', borderColor: '#F4A261', color: 'white' }}>
                  <i className="bi bi-printer-fill"></i>
                </button>
              </div>

              <div className="ingredients-list w-50 p-4 border">
                <h3 className="text-center">Ingredientes</h3>
                <input
                  type="text"
                  placeholder="Buscar ingredientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control my-3 w-100"
                />
                {searchTerm.trim() && (
                  <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    {filteredIngredients.length > 0 ? (
                      filteredIngredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="cursor-pointer"
                          onClick={() => handleAddIngredient(ingredient)}
                        >
                          {ingredient}
                        </li>
                      ))
                    ) : (
                      <p className="text-muted">No se encontraron ingredientes.</p>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <h4 className="text-center mb-4">Elige tu receta para guardar los ingredientes</h4>
          <div className="d-flex flex-row justify-content-evenly align-items-center gap-3 flex-wrap">

            {recipes.map((recipe) => (

              <div key={recipe.id} className="recipe-card-meal-plan" style={{ backgroundImage: `url(${recipe.foto_url})`, width: '200px', height: '200px' }}>
                <div className="recipe-content-meal-plan h-100 d-flex flex-column justify-content-between">
                  <div className="recipe-content-meal-plan d-flex flex-column justify-content-between">
                    <h3 className="text-center w-100">{recipe.titulo}</h3>
                    <div className="m-0">
                      <p><strong>Calorías:</strong> {recipe.calorias}</p>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleAddRecipeIngredients(recipe.ingredients)}
                      >
                        Agregar ingredientes
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

export default ShoppingList;

import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Para gestionar el índice del ingrediente que estamos editando
  const [editQuantity, setEditQuantity] = useState(''); // Para almacenar la cantidad editada

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
    'Longaniza', 'Cerveza', 'Vino rosado', 'Cordero lechal'
  ]);
  

  const handleAddIngredient = (ingredient) => {
    setSelectedIngredients((prev) => [
      ...prev,
      { name: ingredient, quantity: '' }
    ]);
  };

  const handleQuantityChange = (e) => {
    setEditQuantity(e.target.value);
  };

  const handleUpdateQuantity = (index) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index].quantity = editQuantity;
    setSelectedIngredients(updatedIngredients);
    setEditIndex(null); // Dejar de editar una vez se haya guardado
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleUpdateQuantity(index);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditQuantity(selectedIngredients[index].quantity); // Cargar la cantidad actual para poder editarla
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      <h1 className="text-center">Lista de la Compra</h1>
      <div className="d-flex justify-content-between content">

        <div className="shopping-list w-50 p-4 border">
          <h3>Lista de ingredientes seleccionados</h3>
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
                    <span
                      className="ms-2"
                      onClick={() => handleEditClick(index)}
                    >
                      {item.quantity === '' ? 'Añadir cantidad' : item.quantity}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ingredients-list w-50 p-4 border">
          <h3>Ingredientes</h3>
          <input
            type="text"
            placeholder="Buscar ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
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
  );
};

export default ShoppingList;

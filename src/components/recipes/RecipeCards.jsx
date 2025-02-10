import React, { useState } from 'react';
import Slider from 'react-slick';
import '../../styles/recipeCards.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecipeCards() {
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Receta seleccionada

  const recipes = [
    {
      id: 1,
      title: 'Pizza Margarita',
      image: 'https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg',
      description: 'Una deliciosa y clásica pizza margarita con sabores frescos y tradicionales.',
      ingredients: [
        "Masa de pizza",
        "Tomate triturado",
        "Mozzarella",
        "Albahaca fresca",
        "Aceite de oliva",
        "Sal",
        "Orégano"
      ],
      steps: [
        "Precalentar el horno a 200°C.",
        "Extender la masa de pizza sobre una bandeja para horno.",
        "Cubrir la masa con tomate triturado y un poco de sal.",
        "Agregar abundante mozzarella sobre la salsa de tomate.",
        "Hornear la pizza durante 15-20 minutos o hasta que la masa esté dorada y crujiente.",
        "Retirar del horno y añadir hojas de albahaca fresca, un chorrito de aceite de oliva y una pizca de orégano.",
        "Servir caliente y disfrutar."
      ],
      calories: 1200,
      prep_time: "30 minutos",
      nutritional_values: [
        "carbohidratos: 130g",
        "proteínas: 50g",
        "grasas: 55g"
      ],
    },
    {
      id: 2,
      title: 'Ensalada César',
      image: 'https://cdn.pixabay.com/photo/2022/05/20/08/55/pasta-7209002_1280.jpg',
      description: 'Una deliciosa ensalada César con crujientes trozos de pan tostado, pollo a la parrilla, queso parmesano y una sabrosa salsa cremosa.',
      ingredients: [
        "Lechuga romana",
        "Pechuga de pollo (200g)",
        "Pan de molde (2 rebanadas)",
        "Queso parmesano rallado",
        "Salsa César",
        "Aceite de oliva",
        "Sal",
        "Pimienta"
      ],
      steps: [
        "Cortar las rebanadas de pan en cubos y dorar en una sartén con un poco de aceite de oliva hasta que estén crujientes. Reservar.",
        "Lavar y cortar la lechuga en trozos pequeños. Colocar en un bol grande.",
        "Cocinar la pechuga de pollo a la parrilla con un poco de sal y pimienta. Cortar en tiras.",
        "Agregar el pollo a la lechuga en el bol.",
        "Incorporar los cubos de pan tostado y espolvorear queso parmesano rallado al gusto.",
        "Agregar la salsa César y mezclar todo muy bien.",
        "Servir la ensalada César en platos individuales y disfrutar."
      ],
      calories: 350,
      prep_time: "30 minutos",
      nutritional_values: [
        "Carbohidratos: 15g",
        "Proteínas: 25g",
        "Grasas: 20g"
      ],
    },
    {
      id: 3, title: 'Tacos al Pastor',
      image: 'https://cdn.pixabay.com/photo/2023/08/08/08/46/tacos-8176774_1280.jpg',
      description: 'Deliciosos tacos al pastor con carne de cerdo marinada en una mezcla de especias y chiles, acompañados de cebolla, piña, cilantro y salsa.',
      ingredients: [
        "500g de carne de cerdo",
        "1 cebolla",
        "1 piña",
        "Cilantro al gusto",
        "Salsa de tu elección",
        "Tortillas de maíz"
      ],
      steps: [
        "En un tazón, mezcla la carne de cerdo cortada en trozos pequeños con la marinada de tu elección y deja reposar al menos 2 horas en el refrigerador.",
        "Corta la cebolla en rodajas finas, la piña en trozos pequeños y pica el cilantro.",
        "En un comal o sartén caliente, cocina la carne marinada hasta que esté dorada y cocida.",
        "Calienta las tortillas de maíz y rellénalas con la carne, cebolla, piña, cilantro y salsa al gusto.",
        "Disfruta tus deliciosos tacos al pastor recién hechos."
      ],
      calories: 450,
      prep_time: "30 minutos",
      nutritional_values: [
        "Carbohidratos: 30g",
        "Proteínas: 25g",
        "Grasas: 20g"
      ],
    },
    {
      id: 4,
      title: 'Sushi de salmon',
      image: 'https://cdn.pixabay.com/photo/2020/04/04/15/07/sushi-5002639_1280.jpg',
      description: 'Delicioso sushi de salmón envuelto en alga nori y arroz. Una combinación perfecta de sabores frescos y texturas suaves.',
      ingredients: [
        "Alga nori",
        "Arroz",
        "Salmón"
      ],
      steps: [
        "Cocina el arroz siguiendo las instrucciones del paquete y déjalo enfriar.",
        "Coloca una hoja de alga nori sobre una esterilla de bambú.",
        "Cubre 3/4 partes del alga con una capa fina de arroz.",
        "Coloca tiras de salmón en el centro del arroz.",
        "Enrolla el sushi con la ayuda de la esterilla, presionando suavemente para que quede firme.",
        "Corta el rollo en porciones y sirve con salsa de soja y wasabi.",
      ],
      calories: 320,
      prep_time: "30 minutos",
      nutritional_values: [
        "Carbohidratos: 60g",
        "Proteínas: 15g",
        "Grasas: 5g"
      ]
    }
  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="content mb-5 oswald-text-light">
      {/* Slider de recetas */}
      <Slider {...settings}>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <div
              className="recipe-card-home"
              style={{ backgroundImage: `url(${recipe.image})` }}
            >
              <div className="recipe-content-home text-center d-flex flex-column justify-content-between">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="d-flex justify-content-between w-100 text-center">
                  <p>Calorias: {recipe.calories}</p>
                  <button
                    onClick={() => setSelectedRecipe(recipe)} // Cambiar receta seleccionada
                    className="btn btn-success"
                    title="Ver receta completa"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Detalle de receta seleccionado */}
      {selectedRecipe && (
        <div className="recipe-detail content mt-5">
          <div>
            <div className="recipe-card-horizontal">
              <div className="recipe-title">
                <h1 className="recipe-title fs-1 text-center">
                  {selectedRecipe.title}
                </h1>
              </div>
              <div className="recipe-header">
                <div className="d-flex flex-column w-50">
                  <img
                    className="recipe-image mb-4"
                    src={selectedRecipe.image}
                    alt="foto-receta"
                  />
                </div>
                <div className="recipe-info w-50 my-auto">
                  <p>{selectedRecipe.description}</p>
                </div>
              </div>
              <div className="recipe-header flex-wrap">
                <div>
                  <p>
                    <strong>Valores nutricionales:</strong>
                  </p>
                  <ul>
                    {selectedRecipe.nutritional_values.map((e, index) => (
                      <li key={index}>{e}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <strong>Calorías:</strong>{' '}
                  {selectedRecipe.calories || 'No especificadas'}
                </p>
                <p>
                  <strong>Tiempo de preparación:</strong>{' '}
                  {selectedRecipe.prep_time || 'No especificado'}
                </p>
              </div>
              <div className="recipe-content">
                <div className="recipe-section">
                  <p>
                    <strong>Ingredientes:</strong>
                  </p>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <p>
                    <strong>Pasos:</strong>
                  </p>
                  <ol>
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="recipe-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => window.print()}
                  title="Imprimir receta"
                >
                  <i className="bi bi-printer-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeCards;

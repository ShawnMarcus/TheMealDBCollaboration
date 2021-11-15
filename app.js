// https://www.themealdb.com/api/json/v1/1/random.php.

// we had to use the single recipe option because the multi recipe option required patreon status :(

const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
    createMeal(res.meals[0]);
  });
});

const createMeal = (meal) => {
    const ingredients = [];
    // Get all ingredients from the object. Up to 20
    for(let i=1; i<=20; i++) {
      // strIngredients gives us the ingredients list, strMeasure gives us the amounts.
      if(meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
      } else {
        // Stop if no more ingredients
        break;
      }
    }

    // strMealThumb gives us a thumbnail image, strCategory gives us the Category of Meal, and strArea give us a geographical region (where the meal comes from). strTags help classify the recipe according to dessert, street food, etc., and are joined by commas with spaces to make them easier to read.
    const newInnerHTML = `
    <div class="row">
      <div class="columns five">
      <center>
        <img src="${meal.strMealThumb}" alt="Meal Image">
        </center>
        ${meal.strCategory ? `<h1><strong>Category:</strong> ${meal.strCategory}</h1>` : ''}
        ${meal.strArea ? `<h1><strong>Area:</strong> ${meal.strArea}</h1>` : ''}
        ${meal.strTags ? `<h1><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</h1>` : ''}
      
        <h1>Ingredients:</h1>
        <h2>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        </h2>
      </div>
    
      <div class="columns seven">
        <h1>${meal.strMeal}</h1>
        <h2>${meal.strInstructions}</h2>
      </div>
    </div>
    ${meal.strYoutube ? `
    <div class="row">
      <h3>Video Recipe</h3>
      <div class="videoWrapper">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
      </div>
    </div>` : ''}
  `;
  
  meal_container.innerHTML = newInnerHTML;
}



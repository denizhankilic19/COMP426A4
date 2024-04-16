const appId = '23b12ee6';
const appKey = 'd53fed867a5efeda6aca6f5c51a0ed69';
const weatherAPIKey = '449290a2f6ff6ce564ce5853de49c9db'; // Replace with your OpenWeather API key

function searchRecipes() {
    const ingredients = document.getElementById('ingredientsInput').value;
    fetch(`https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.hits);
            // Call function to fetch weather data
            fetchWeather();
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h3>${recipe.recipe.label}</h3>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <p>Ingredients: ${recipe.recipe.ingredientLines.join(', ')}</p>
            <p><a href="${recipe.recipe.url}" target="_blank">View Recipe</a></p>
        `;
        recipeResults.appendChild(recipeDiv);
    });
}

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Call function to display weather data
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(weatherData) {
    const weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = `
        <h3>Weather</h3>
        <p>Temperature: ${weatherData.main.temp} °C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Description: ${weatherData.weather[0].description}</p>
    `;
}
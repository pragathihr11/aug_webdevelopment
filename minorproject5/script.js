const weatherBtn = document.getElementById("weatherBtn");
const movieBtn = document.getElementById("movieBtn");

const cityInput = document.getElementById("cityInput");
const movieInput = document.getElementById("movieInput");

const weatherResult = document.getElementById("weatherResult");
const movieResult = document.getElementById("movieResult");


/* =========================
   WEATHER APP
========================= */

weatherBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});


async function getWeather() {

  const city = cityInput.value.trim();

  if (city === "") {
    weatherResult.innerHTML =
      `<p class="error">Please enter a city name.</p>`;
    return;
  }

  weatherResult.innerHTML =
    `<p class="placeholder">Finding the weather...</p>`;

  try {

    const response = await fetch(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`
    );

    if (!response.ok) {
      throw new Error("Weather information not found");
    }

    const data = await response.json();

    const current = data.current_condition[0];
    const location = data.nearest_area[0];

    const cityName = location.areaName[0].value;
    const country = location.country[0].value;

    const temperature = current.temp_C;
    const condition = current.weatherDesc[0].value;
    const humidity = current.humidity;
    const wind = current.windspeedKmph;

    weatherResult.innerHTML = `
      <div class="weather-card">

        <div class="weather-main">

          <div class="weather-city">
            ${cityName}
          </div>

          <div class="weather-condition">
            ${country} · ${condition}
          </div>

          <div class="temperature">
            ${temperature}°C
          </div>

        </div>

        <div class="weather-details">

          <div class="detail">
            <span>Humidity</span>
            <strong>${humidity}%</strong>
          </div>

          <div class="detail">
            <span>Wind Speed</span>
            <strong>${wind} km/h</strong>
          </div>

        </div>

      </div>
    `;

  } catch (error) {

    weatherResult.innerHTML = `
      <p class="error">
        Unable to find that city. Please try again.
      </p>
    `;
  }
}


/* =========================
   MOVIE APP
========================= */

movieBtn.addEventListener("click", searchMovies);

movieInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchMovies();
  }
});


async function searchMovies() {

  const movieName = movieInput.value.trim();

  if (movieName === "") {
    movieResult.innerHTML =
      `<p class="error">Please enter a movie name.</p>`;
    return;
  }

  movieResult.innerHTML =
    `<p class="placeholder">Searching for movies...</p>`;

  try {

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=564727fa&s=${encodeURIComponent(movieName)}`
    );

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error("Movies not found");
    }

    displayMovies(data.Search);

  } catch (error) {

    movieResult.innerHTML = `
      <p class="error">
        No movies found. Try another search.
      </p>
    `;
  }
}


/* =========================
   DISPLAY MOVIES
========================= */

function displayMovies(movies) {

  movieResult.innerHTML = "";

  movies.slice(0, 8).forEach((movie) => {

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Poster";

    const card = document.createElement("div");

    card.className = "movie-card";

    card.innerHTML = `
      <img
        src="${poster}"
        alt="${movie.Title}"
      >

      <div class="movie-info">

        <h3>${movie.Title}</h3>

        <p>
          ${movie.Type} · ${movie.Year}
        </p>

        <p class="rating">
          IMDb · ${movie.imdbID}
        </p>

      </div>
    `;

    movieResult.appendChild(card);
  });
}
/* CLEAR RESULTS WHEN SEARCH BOX IS EMPTY */

cityInput.addEventListener("input", function () {
  if (cityInput.value.trim() === "") {
    weatherResult.innerHTML = `
      <p class="placeholder">
        Search for a city to see its current weather.
      </p>
    `;
  }
});


movieInput.addEventListener("input", function () {
  if (movieInput.value.trim() === "") {
    movieResult.innerHTML = `
      <p class="placeholder">
        Search for a movie and discover something new.
      </p>
    `;
  }
});
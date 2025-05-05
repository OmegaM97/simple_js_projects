let weatherInfo = {};

document.querySelector('.js-search-button')
.addEventListener('click', () => {
  const inputBtn = document.querySelector('.js-search-input');
  let city = inputBtn.value.split('-');
  console.log(city);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&appid=4775bdf04db21ebed84adef3712debfd&units=metric`).then((response) => {
    return response.json();
  }).then((data) => {
    weatherInfo = data;
    renderOnPage();

    inputBtn.value = '';
  });

})

function renderOnPage() {
  let description = simplifyWeather(weatherInfo.weather[0].description);
  const inputBtn = document.querySelector('.js-search-input');

  let contentHTML = `
  <div class="location inner-container">
      <img src="images/location-icon.png" alt="location-icon" class="location-icon">
      <div class="location-name">${inputBtn.value}</div>
    </div>

    <div class="weather-icon inner-container"> 
      <img src="images/${description}.png" alt="">
    </div>

    <div class="weather-description inner-container">${description}</div>

    <br>
    <div class="temprature inner-container">Feels like ${weatherInfo.main.feels_like}<sup>&deg;</sup>C</div>

    <div class="humidity inner-container">Humidity: ${weatherInfo.main.humidity}%</div>

    <div class="wind-speed inner-container">
      Wind speed: ${weatherInfo.wind.speed}km/h
    </div>
  </div>
  `

  document.querySelector('.generate-div')
  .innerHTML = contentHTML;
}

function simplifyWeather(description) {
  description = description.toLowerCase();

  const cloudy = ["few clouds", "scattered clouds", "overcast clouds"];
  const rain = ["light rain", "moderate rain", "heavy rain"];
  const thunderstorm = ["thunderstorm", "thunderstorm with rain"];
  const snow = ["light snow", "snow", "heavy snow"];

  if (description === "clear sky") return "Clear";
  if (cloudy.includes(description)) return "Cloudy";
  if (rain.includes(description)) return "Rain";
  if (thunderstorm.includes(description)) return "Thunderstorm";
  if (snow.includes(description)) return "Snow";

  // Default fallback
  return "Windy";
}
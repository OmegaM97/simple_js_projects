let weatherInfo = {};

document.querySelector('.js-search-input')
.addEventListener('keydown', (event) => {
  if(event.key == 'Enter') {
    searchTheWeather();
  } 
})

document.querySelector('.js-search-button')
.addEventListener('click', () => {
  searchTheWeather();
})


function searchTheWeather() {
  document.querySelector('.generate-div')
  .innerHTML = `
  <p class="loading-para">Loading...</p>
      <div class="loading-container">
        <div class="loading-circle">
        </div>
      </div>
  `;

  const inputBtn = document.querySelector('.js-search-input');
  let city = inputBtn.value.split('-');

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&appid=4775bdf04db21ebed84adef3712debfd&units=metric`).then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  }).then((data) => {
    weatherInfo = data;
    renderOnPage();
    inputBtn.value = '';
  }).catch((error) => {

    if(error.status >= 400 && error.status < 500) {
      document.querySelector('.generate-div')
      .innerHTML = `<p class='error-message'>Please select a valid city from the list!!</p>`;
      inputBtn.value = '';
    } else {
      document.querySelector('.generate-div')
      .innerHTML = `<p class='error-message'>Sorry, try again later</p>`;
      inputBtn.value = '';
    }
    
  });

}

function renderOnPage() {
  let description = simplifyWeather(weatherInfo.weather[0].description);
  const inputBtn = document.querySelector('.js-search-input');
  const time = checkDayOrNight(weatherInfo.dt, weatherInfo.timezone);

  let contentHTML = `
  <div class="location inner-container">
      <img src="images/location-icon.png" alt="location-icon" class="location-icon">
      <div class="location-name">${inputBtn.value}</div>
    </div>

    <div class="weather-icon inner-container"> 
      <img src="images/${time >= 6 && time <= 18? description: description + ' night'}.png" alt="">
    </div>

    <div class="weather-description inner-container">${description}</div>

    <br>

    <div class="time-div">Local time: ${checkTime(weatherInfo.dt, weatherInfo.timezone)}</div>
    </div>

    <div class="temprature inner-container">Feels like ${roundNum(weatherInfo.main.feels_like)}<sup>&deg;</sup>C</div>

    <div class="humidity inner-container">Humidity: ${weatherInfo.main.humidity}%</div>

    <div class="wind-speed inner-container">
      Wind speed: ${weatherInfo.wind.speed}m/s
    </div>
  </div>
  `

  document.querySelector('.generate-div')
  .innerHTML = contentHTML;

  const container = document.querySelector('.container');
  const body = document.querySelector('body');

  container.classList.remove('sun-rise', 'day', 'sun-set', 'night');
  body.classList.remove('sun-riseb', 'dayb', 'sun-setb', 'nightb');

  if (time >= 5 && time <= 7) {
    container.classList.add('sun-rise');
    body.classList.add('sun-riseb')
  } else if (time > 7 && time <= 16) {
    container.classList.add('day');
    body.classList.add('dayb')
  } else if (time > 16 && time < 19) {
    container.classList.add('sun-set');
    body.classList.add('sun-setb')
  } else {
    container.classList.add('night');
    body.classList.add('nightb')
  }
}

function checkDayOrNight(dt, timezone) {
  const time = new Date((dt + timezone) * 1000);
  return time.getUTCHours();
}

function checkTime(dt, timezone) {
  const date = new Date((dt + timezone) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function simplifyWeather(description) {
  description = description.toLowerCase();

  const cloudy = ["broken clouds", "overcast clouds"];
  const clouds = ["few clouds", "scattered clouds"]
  const rain = ["light rain", "moderate rain", "heavy rain"];
  const thunderstorm = ["thunderstorm", "thunderstorm with rain"];
  const snow = ["light snow", "snow", "heavy snow"];
  const drizzle = ["light intensity drizzle", "drizzle","heavy intensity drizzle", "light intensity drizzle rain", "drizzle rain", "heavy intensity drizzle rain"]

  if (description === "clear sky") return "Clear";
  if (cloudy.includes(description)) return "Cloudy";
  if (clouds.includes(description)) return "Partly Cloudy";
  if (rain.includes(description)) return "Rain";
  if (drizzle.includes(description)) return "Drizzle";
  if (thunderstorm.includes(description)) return "Thunderstorm";
  if (snow.includes(description)) return "Snow";

  // Default fallback
  return "Windy";
}

function roundNum(number) {
  return Math.round(number);
}
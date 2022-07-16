let now = new Date();
let currentTime = document.querySelector("#currentTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
let min = now.getMinutes();
if (min < 10) {
  min = "0" + min;
} else {
  min = min + "";
}
currentTime.innerHTML = `${day}, ${hours}:${min}`;

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastDays.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-day">${formatDay(forecastDay.dt)}
               <img class="icon-next-days" src="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png" id="icon" alt="Icon" /> 
              <div class="temperature-next-days"> ${Math.round(
                forecastDay.temp.max
              )} ºc</div>
            </div></div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function search(cityInput) {
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(newWeather);
}
function newCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-entered").value;
  search(cityInput);
}
function newWeather(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#just-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#clouds").innerHTML = Math.round(
    response.data.clouds.all
  );

  getForecast(response.data.coord);
}

let searchedCity = document.querySelector("#enter-city");
searchedCity.addEventListener("submit", newCity);

function findPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let units = "metric";
  let endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(endpointUrl).then(newWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(findPosition);
}

let currentPositionButton = document.querySelector(".current-location");
currentPositionButton.addEventListener("click", getCurrentPosition);

function parisSearched() {
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(newWeather);
}

let parisCity = document.querySelector("#select-paris");
parisCity.addEventListener("click", parisSearched);

function madridSearched() {
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=madrid&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(newWeather);
}

let madridCity = document.querySelector("#select-madrid");
madridCity.addEventListener("click", madridSearched);

function newyorkSearched() {
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(newWeather);
}

let newyorkCity = document.querySelector("#select-newyork");
newyorkCity.addEventListener("click", newyorkSearched);

function losangelesSearched() {
  let apiKey = "c4d36cc9101ca41ceee2cff31c436ac9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(newWeather);
}

let losangelesCity = document.querySelector("#select-losangeles");
losangelesCity.addEventListener("click", losangelesSearched);

search("paris");

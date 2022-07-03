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

search("Madrid");

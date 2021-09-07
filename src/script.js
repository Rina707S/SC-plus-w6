let today = document.querySelector("#date");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tyuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

today.innerHTML = `${day} ${hour}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let apiKey = "c9aaec0a4189697bb2f4013911b89486";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c9aaec0a4189697bb2f4013911b89486";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function whereAreYou(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", city);

let currentLocationButton = document.querySelector("#where-button");
currentLocationButton.addEventListener("click", whereAreYou);

search("Tokyo");

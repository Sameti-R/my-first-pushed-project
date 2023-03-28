let city = document.querySelector("#chosen-city");

let now = new Date();
let day = now.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = weekDays[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();
let time = `${hour}:${minute}`;

let theDay = document.querySelector("#what-day");
let theTime = document.querySelector("#what-time");

function changeCity(event) {
  event.preventDefault();

  theDay.innerHTML = `${day}`;
  theTime.innerHTML = `${time}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let weatherForecast = document.querySelector("#weather");
weatherForecast.addEventListener("submit", changeCity);
function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let cityTemp = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${cityTemp}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed}`;
  let sky = document.querySelector("#sky");
  sky.innerHTML = `${response.data.weather[0].description}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a1181481ea4e88c11541b6fdfb74d7f4";
  let apiUrlPart = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlPart}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

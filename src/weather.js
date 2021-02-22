const API_KEY = "e3b36115f5aa0b0d9550496d8487f9cf";
const COORDS = "coords";

const weather = document.querySelector(".weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}°C \n 📍${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geo location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null || loadedCoords === "") {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
  console.log(loadedCoords);
}

function init() {
  loadCoords();
}

init();

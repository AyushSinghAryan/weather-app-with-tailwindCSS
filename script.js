const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const recentCitiesContainer = document.getElementById("recentCitiesContainer");
const recentCitiesSelect = document.getElementById("recentCities");

const API_KEY = "af9f93ff0061995f4964fd04fbbec6c7";

function createWeatherCard(cityName, weatherItem, index) {
    if (index === 0) { // HTML for the main weather card
        return `
    
                
                <div class="details">
                    <h2 class="font-bold text-2xl">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6 class="mt-2 text-lg">Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6 class="mt-2 text-lg">Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6 class="mt-2 text-lg">Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon text-center">
                    <img src="https://openweathermap.org/img/wn/01d@4x.png" alt="weather-icon"
                        class="max-w-[120px] -mt-4">
                    <h6 class="-mt-2 capitalize">Clear sky</h6>
                </div>
                `;
    } else { // HTML for the other five day forecast card
        return `<li class="card flex-1 p-4 bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-md text-white">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

function getWeatherDetails(cityName, latitude, longitude) {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            const uniqueForecastDays = [];
            const fiveDaysForecast = data.list.filter(function (forecast) {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    return uniqueForecastDays.push(forecastDate);
                }
            });

            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            fiveDaysForecast.forEach(function (weatherItem, index) {
                const html = createWeatherCard(cityName, weatherItem, index);
                if (index === 0) {
                    currentWeatherDiv.insertAdjacentHTML("beforeend", html);
                } else {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
                }
            });
        })
        .catch(function () {
            alert("An error occurred while fetching the weather forecast!");
        });
}

function getCityCoordinates(cityName = null) {
    cityName = cityName || cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    console.log("The city being searched is: ", cityName);

    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(API_URL)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log(data);
            if (!data.length) {
                return alert(`No coordinates found for ${cityName}`);
            }
            const { lat, lon, name } = data[0];
            getWeatherDetails(name, lat, lon);
            addCityToLocalStorage(cityName);
        })
        .catch(function () {
            alert("An error occurred while fetching the coordinates!");
        });
}

searchButton.addEventListener("click", function () { getCityCoordinates(); });

cityInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") getCityCoordinates();
});

function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const { latitude, longitude } = position.coords;
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                })
                .catch(function () {
                    alert("An error occurred while fetching the city name!");
                });
        },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        }
    );
}

locationButton.addEventListener("click", getUserCoordinates);

function addCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('recentCities')) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(cities));
    }

    populateDropdown();
}

function populateDropdown() {
    let cities = JSON.parse(localStorage.getItem('recentCities')) || [];

    if (cities.length > 0) {
        recentCitiesContainer.style.display = 'block';
        recentCitiesSelect.innerHTML = '';

        cities.forEach(function (city) {
            const option = document.createElement('option');
            option.value = city;
            option.text = city;
            recentCitiesSelect.appendChild(option);
        });
    } else {
        recentCitiesContainer.style.display = 'none';
    }
}

recentCitiesSelect.addEventListener('change', function () {
    const city = recentCitiesSelect.value;
    if (city) {
        getCityCoordinates(city);
    }
});

window.onload = function () {
    populateDropdown();
};

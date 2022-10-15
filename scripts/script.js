let weatherApp = document.querySelector('.weather-app')

let findBtn = document.querySelector('.magnifier-block');
let cityInput = document.querySelector('#another-location');

let temperatureOutput = document.querySelector('#temperature-out');
let cityOutput = document.querySelector('#city-out');
let timeOutput = document.querySelector('.time');
let dateOutput = document.querySelector('.date');
let weatherIcon = document.querySelector('.weather-icon-img');
let weatherOut = document.querySelector('#condition-out');

let chosenCities = document.querySelectorAll('.chosen-cities');
let cloudsOutput = document.querySelector('#cloudy-value');
let humidityOutput = document.querySelector('#humidity-value');
let windOutput = document.querySelector('#wind-value');
let pressureOut = document.querySelector('#pressure-value');

let city = "Poltava";
getWeather(city);
let lat;
let lon;

findBtn.addEventListener('click', () => {
    city = cityInput.value;
    getWeather(city);
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        city = cityInput.value;
        getWeather(city);
    }
})
for (const chosenCity of chosenCities) {
    chosenCity.addEventListener('click', () => {
        city = chosenCity.textContent;
        getWeather(city);
    })
}

function getWeather(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&appid=bf35cac91880cb98375230fb443a116f";
    fetch(url)
        .then(response => response.json())
        .then(json => {
            lat = json.coord.lat;
            lon = json.coord.lon;
            cityOutput.textContent = json.name;
            temperatureOutput.textContent = (json.main.temp - 273.15).toFixed(1) + "°";
            let weather = json.weather[0].main;
            switch (weather) {
                case "Clear":
                    weatherOut.textContent = "Clear";
                    weatherIcon.src = "images/icons/clear-icon.png";
                    weatherApp.style.background = "url('images/bg/clear-bg.png')";
                    findBtn.style.background = "rgba(160, 228, 252, 0.75)";
                    break;
                case "Clouds":
                    weatherOut.textContent = "Cloudy";
                    weatherIcon.src = "images/icons/cloudy-icon.png";
                    weatherApp.style.background = "url('images/bg/cloudy-bg.png')";
                    findBtn.style.background = "rgba(240, 179, 125, 0.78)";
                    break;
                case "Rain":
                case "Thunderstorm":
                case "Drizzle":
                    weatherOut.textContent = "Rainy";
                    weatherIcon.src = "images/icons/rainy-icon.png";
                    weatherApp.style.background = "url('images/bg/rainy-bg.png')";
                    findBtn.style.background = "rgba(180, 176, 166, 0.82)";
                    break;
                case "Snow":
                    weatherOut.textContent = "Snow";
                    weatherIcon.src = "images/icons/snow-icon.png";
                    weatherApp.style.background = "url('images/bg/snow-bg.png')";
                    findBtn.style.background = "rgba(227, 237, 245, 0.86)";
                    break;
            }
            cloudsOutput.textContent = json.clouds.all + "%";
            humidityOutput.textContent = json.main.humidity + "%";
            windOutput.textContent = json.wind.speed + "m/s";
            pressureOut.textContent = json.main.pressure + "hPa";
        })
}

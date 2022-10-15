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

let daysOfWeekOut = document.querySelectorAll('.day-of-week');
let moreTemperatureOutputs = document.querySelectorAll('.temperature-value');
let moreWeatherIcons = document.querySelectorAll('.more-weather-icon');
let moreWeatherValues = document.querySelectorAll('.more-weather-value');
let weatherBlocks = document.querySelectorAll('.weather-block');

let city = "Poltava";
getWeather(city);
setInterval(getDate, 60000);
let temperatureByCelsius;
let temperatureByFahrenheit;
let celsius = true;
let newCityFlag = false;
let lat;
let lon;

temperatureOutput.addEventListener('click', () => {
    if (celsius) {
        temperatureOutput.textContent = temperatureByFahrenheit + "°F";
        celsius = false;
    } else {
        temperatureOutput.textContent = temperatureByCelsius + "°C";
        celsius = true;
    }
})
cityInput.addEventListener('click', () => {
    newCityFlag = true;
    setTimeout(() => newCityFlag = false, 1000);
})
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
        newCityFlag = true;
        setTimeout(() => newCityFlag = false, 1000);
    });
}

function getWeather(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&appid=bf35cac91880cb98375230fb443a116f";
    fetch(url)
        .then(response => response.json())
        .then(json => {
            lat = json.coord.lat;
            lon = json.coord.lon;
            cityOutput.textContent = json.name;
            temperatureByCelsius = (json.main.temp - 273.15).toFixed(1);
            temperatureByFahrenheit = ((json.main.temp - 273.15) * (9 / 5) + 32).toFixed(1);
            if (celsius) temperatureOutput.textContent = temperatureByCelsius + "°C";
            else temperatureOutput.textContent = temperatureByFahrenheit + "°F";

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

            let urlExtra = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=bf35cac91880cb98375230fb443a116f&units=metric";
            fetch(urlExtra)
                .then(response => response.json())
                .then(json => {
                    for (let i = 1; i <= weatherBlocks.length; i++) {
                        moreTemperatureOutputs[i - 1].textContent = (json.daily[i].temp.day).toFixed(1) + "°";
                        let moreWeather = json.daily[i].weather[0].main;
                        switch (moreWeather) {
                            case "Clear":
                                moreWeatherValues[i - 1].textContent = "Clear";
                                moreWeatherIcons[i - 1].src = "images/icons/clear-icon.png";
                                break;
                            case "Clouds":
                                moreWeatherValues[i - 1].textContent = "Cloudy";
                                moreWeatherIcons[i - 1].src = "images/icons/cloudy-icon.png";
                                break;
                            case "Rain":
                            case "Thunderstorm":
                            case "Drizzle":
                                moreWeatherValues[i - 1].textContent = "Rainy";
                                moreWeatherIcons[i - 1].src = "images/icons/rainy-icon.png";
                                break;
                            case "Snow":
                                moreWeatherValues[i - 1].textContent = "Snow";
                                moreWeatherIcons[i - 1].src = "images/icons/snow-icon.png";
                                break;
                        }
                    }
                })
        })
    getDate();
}

function getDate() {
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let date = new Date();
    let hours;
    if (String(date.getHours()).length === 1) hours = "0" + date.getHours();
    else hours = date.getHours();
    let minutes;
    if (String(date.getMinutes()).length === 1) minutes = "0" + date.getMinutes();
    else minutes = date.getMinutes();
    let day = date.getUTCDate();
    let dayOfWeek = daysOfWeek[date.getDay()];
    let month = months[date.getMonth()];
    let fullYear = String(date.getFullYear());
    let year = "'" + fullYear[2] + fullYear[3];

    timeOutput.textContent = `${hours}:${minutes}`;
    dateOutput.textContent = `${dayOfWeek}, ${day} ${month} ${year}`;
    for (let i = 1; i <= daysOfWeekOut.length; i++) {
        daysOfWeekOut[i - 1].textContent = daysOfWeek[date.getDay()+i];
    }
}

let rightSideBar = document.querySelector('.right-wrapper');
let leftSideBar = document.querySelector('.left-wrapper');
let mainInfo = document.querySelector('.main-info-wrapper');
let leftPart = document.querySelector('.right-wrapper-left');
let rightPart = document.querySelector('.right-wrapper-right');


    rightSideBar.addEventListener('mouseover', () => {
        rightSideBar.classList.add('right-wrapper-hovered');
        leftSideBar.classList.add('left-wrapper-hovered');
    });
    findBtn.addEventListener('mouseover', () => {
        rightSideBar.classList.add('right-wrapper-hovered');
        leftSideBar.classList.add('left-wrapper-hovered');
    });
    rightSideBar.addEventListener('mouseout', () => {
        rightSideBar.classList.remove('right-wrapper-hovered');
        leftSideBar.classList.remove('left-wrapper-hovered');
    });
    findBtn.addEventListener('mouseout', () => {
        rightSideBar.classList.remove('right-wrapper-hovered');
        leftSideBar.classList.remove('left-wrapper-hovered');
    });

rightSideBar.addEventListener('click', () => {
    if (!newCityFlag) {
        rightSideBar.classList.toggle('right-wrapper-full');
        leftSideBar.classList.toggle('left-wrapper-hidden');
        leftPart.classList.toggle('right-wrapper-left-active');
        rightPart.classList.toggle('right-wrapper-right-active');
        mainInfo.classList.toggle('main-info-hidden');
        for (const weatherBlock of weatherBlocks) {
                weatherBlock.classList.toggle('hidden');
                setTimeout(() => weatherBlock.classList.toggle('invisible'), 200);
        }
    }
});

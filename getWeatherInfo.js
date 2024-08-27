//Get weather data from a weather API
const apiKey = "6de9104fa4226eae672905b96492b500" //My key here

const locationInput = document.getElementById("locationInput")
const searchButton = document.getElementById("searchButton")

const imgEl = document.getElementById("weatherPic")
const locationEl = document.getElementById("location")
const latEl = document.getElementById("lat")
const lonEl = document.getElementById("lon")
const temperatureEl = document.getElementById("temperature")
const descEl = document.getElementById("description")
const humidityEl = document.getElementById("humidity")
const windSpeedEl = document.getElementById("windSpeed")


//Add a click function to the search button that takes our location and gets the weather for that city
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        geoCode(location)
    }
})

//Use the given location and OpenWeather's geocode API to translate the location into a longitude and latitude
//https://openweathermap.org/api/geocoding-api
async function geoCode(location) {
    console.log(location);
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            
            fetchWeather(lat, lon)

        } else {
            throw new Error("No location data found");
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
}

//Uses the lat and lon data from the previous request and get the city weather data
//https://openweathermap.org/current
async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    console.log(url)

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            //Un-hide html elements
            document.getElementById("today").style.display = "grid";

            //Change html element text content here
            locationEl.textContent = `City: ${locationInput.value}`;
            latEl.textContent = `Latitude: ${lat}`;
            lonEl.textContent = `Longitude: ${lon}`;
            temperatureEl.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            descEl.textContent = `Weather: ${data.weather[0].description}`
            humidityEl.textContent = `Humidity: ${data.main.humidity}`
            windSpeedEl.textContent = `Wind Speed: ${data.wind.speed}`

            const icon = data.weather[0].icon
            imgEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

        } else {
            throw new Error("No location data found");
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
}
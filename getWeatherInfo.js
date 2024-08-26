//Get weather data from a weather API
const apiKey = "6de9104fa4226eae672905b96492b500" //My key here

const locationInput = document.getElementById("locationInput")
const searchButton = document.getElementById("searchButton")
const temperatureEl = document.getElementById("temperature")

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

//Uses the lat and lon data from the previous request and gets the city weather data
//https://openweathermap.org/current
async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    //console.log(url)

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            //Change html element text content here
            temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;

            //
            changeWeatherImage()

        } else {
            throw new Error("No location data found");
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
}

function changeWeatherImage(desc) {
    console.log("")
}
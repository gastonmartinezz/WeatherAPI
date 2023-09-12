const btn = document.getElementById('searchBtn');

const inputCiudad = document.getElementById('searchCity');
const inputPais = document.getElementById('searchCountry');

const Key = "1843ebd13ae1cee00a0f27f55003d222";

btn.addEventListener('click', () => {
    let ciudad = inputCiudad.value;
    let pais = inputPais.value;

    const coordAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${Key}`;

    fetch(coordAPI)
    .then(response => response.json())
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}`;

        fetch(weatherAPI)
        .then(response => response.json())
        .then(info => {
            const temp = Math.round(info.main.temp - 273.15);
            const sensacion = Math.round(info.main.feels_like - 273.15);
            const maxTemp = Math.round(info.main.temp_max - 273.15);
            const minTemp = Math.round(info.main.temp_min - 273.15);
            const humidity = info.main.humidity;
            const tiempo = info.weather[0].main;
            const desc = info.weather[0].description;
            const region = info.name;

            const datos = document.getElementById('datos');
            datos.innerHTML = 
            `
            <h1>${region}</h1>
            <h2>${tiempo}</h2>
            <h4>${temp}°</h4>
            <p>Sensacion térmica: ${sensacion}°</p>
            <p>Máxima Temperatura: ${maxTemp}° </p>
            <p>Mínima Temperatura: ${minTemp}° </p>
            <p>Humedad: ${humidity}% </p>
            `
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    })
    .catch(error => {
        console.log("Error: ", error);
    })
})
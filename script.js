var search_input = document.getElementById('search_input');
var country_grid = document.getElementById('country_grid');

function search_country() {
    var search_value = search_input.value.trim().toLowerCase();
    if (search_value !== '') {
        var url = `https://restcountries.com/v3/name/${search_value}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                country_grid.innerHTML = '';
                if (data.status === 404) {
                    country_grid.innerHTML = '<p>No results found</p>';
                } else {
                    data.forEach(country => {
                        var countryCard = document.createElement('div');
                        countryCard.classList.add('grid-item');
                        countryCard.innerHTML = `
      <img src="${country.flags[0]}" alt="${country.flags.svg}" class="flag">
      <!-- <h4>${country.flags[0]}</h4> -->
      <h3>${country.name.common}</h3>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <button class="button-31" id="weather_button${country.name.common}" onclick="get_weather('${country.name.common}', this)">More Details</button>
      <div id="${country.name.common}Weather" style="display: none;"></div>
    `;
                        country_grid.appendChild(countryCard);
                    });
                }
            })

    }
};

function get_weather(countryName) {
    var weather_div = document.getElementById(`${countryName}Weather`);

    var weather_button = document.getElementById("weather_button" + countryName);

    var url_0 = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=90dfe8c16d20d81a6b365f55111568ea&units=metric`;
    fetch(url_0)
        .then(response => response.json())
        .then(data => {
            weather_div.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon" class="weather-icon">
      <p>Weather: ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
    `;
            weather_div.style.display = 'block';
            weather_button.textContent = 'Hide Details';
            weather_button.onclick = function() {
                hide_weather(weather_div, weather_button);
            };
        })

}


function hide_weather(weather_div, button) {
    weather_div.style.display = 'none';
    button.textContent = 'More Details';
    button.onclick = function() {
        get_weather(weather_div.id.slice(0, -7));
    };
}
document.addEventListener('DOMContentLoaded', function() {
const apiKey = 'e9ab6010ea00cd305a7faedeb79b746c';

const cityNameElement = document.querySelector('.cityName');
const tempElement = document.querySelector('.temp');
const dateTimeElement = document.querySelector('.date-time');
const iconElement = document.querySelector('.icon');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity div:nth-child(2)');
const windElement = document.querySelector('.wind div:nth-child(2)');

function fetchWeather(city) {
  city = city.replace(/\s+/g, '+');

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update the main card with current weather data
      cityNameElement.textContent = data.name;
      tempElement.textContent = `${data.main.temp} °C`;

      const timestamp = data.dt * 1000; // Convert seconds to milliseconds
      const date = new Date(timestamp);

      const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };

      dateTimeElement.textContent = date.toLocaleDateString('en-US', options);

      iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      descriptionElement.textContent = data.weather[0].description;

      humidityElement.textContent = `${data.main.humidity}%`;
      windElement.textContent = `${data.wind.speed} m/s`;
    })
    .catch((error) => {
      cityNameElement.textContent = 'Cannot find the weather';
        tempElement.textContent = '-- °C';
        dateTimeElement.textContent = '';
        iconElement.src = ''; // Clear the icon
        descriptionElement.textContent = '';
        humidityElement.textContent = '';
        windElement.textContent = '';
        console.error('Error fetching weather data:', error);
      console.error('Error fetching weather data:', error);
    });
}
const searchButton = document.querySelector('.searchitem');
const searchBar = document.querySelector('.bar');

searchButton.addEventListener('click', () => {
  const city = searchBar.value;
  fetchWeather(city);
  fetchWeeklyWeather(city);
});
function fetchWeeklyWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const now = new Date();
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let daysProcessed = 0;
      const smallCards = document.querySelectorAll('.small-cards');

      for (let i = 0; i < data.list.length; i++) {
        const forecastData = data.list[i];
        const forecastTimestamp = forecastData.dt * 1000; // Convert seconds to milliseconds
        const forecastDate = new Date(forecastTimestamp);

        if (forecastDate > now && daysProcessed < 4) {
          // Extract the day, icon, and description for the card
          const dayName = weekdays[forecastDate.getDay()];
          const iconUrl = `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
          const description = forecastData.weather[0].description;

const smallCards = document.querySelectorAll('.small-cards');

for (let i = 0; i < smallCards.length; i++) {
  const smallCard = smallCards[i];
  const dayElement = smallCard.querySelector('.day');
  const iconElement = smallCard.querySelector('.icon');
  const descriptionElement = smallCard.querySelector('.description');
  
  // Calculate the day for the small card based on the current day
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + i + 1); // Add 1 day, 2 days, 3 days, and 4 days to the current date
  const dayName = weekdays[nextDay.getDay()];
  const iconUrl = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
  const description = data.list[i].weather[0].description;
  
  dayElement.textContent = dayName;
  iconElement.src = iconUrl;
  descriptionElement.textContent = description;
            daysProcessed++;
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching weekly weather data:', error);
    });
}
});

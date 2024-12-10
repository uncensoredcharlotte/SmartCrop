const apiKey = '17f568806b998204677878f1748c5e87'; //  OpenWeatherMap API key

async function fetchWeatherForecast() {
  const weatherLocation = document.getElementById('weatherLocation');
  const forecastContainer = document.getElementById('forecastContainer');

  // Check if Geolocation API is supported
  if (!navigator.geolocation) {
    weatherLocation.textContent = 'Geolocation is not supported by your browser.';
    return;
  }

  // Use Geolocation API to get coordinates
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        // Fetch weather data from OpenWeatherMap One Call API
        const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        // Update UI with location information
        weatherLocation.textContent = `Location: Latitude ${lat}, Longitude ${lon}`;

        // Display the 7-day forecast
        forecastContainer.innerHTML = ''; // Clear any existing content
        data.daily.slice(0, 7).forEach((day, index) => {
          const forecastDate = new Date(day.dt * 1000).toDateString();
          const forecastCard = document.createElement('div');
          forecastCard.classList.add('forecast-card');
          forecastCard.innerHTML = `
            <h4>Day ${index + 1}: ${forecastDate}</h4>
            <p><strong>Temperature:</strong> ${day.temp.day}°C</p>
            <p><strong>Min:</strong> ${day.temp.min}°C, <strong>Max:</strong> ${day.temp.max}°C</p>
            <p><strong>Weather:</strong> ${day.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${day.humidity}%</p>
          `;
          forecastContainer.appendChild(forecastCard);
        });
      } catch (error) {
        weatherLocation.textContent = 'Error fetching weather data.';
        console.error('Fetch error:', error);
      }
    },
    (error) => {
      // Handle location errors
      switch (error.code) {
        case error.PERMISSION_DENIED:
          weatherLocation.textContent = 'Location permission denied.';
          break;
        case error.POSITION_UNAVAILABLE:
          weatherLocation.textContent = 'Location unavailable.';
          break;
        case error.TIMEOUT:
          weatherLocation.textContent = 'Location request timed out.';
          break;
        default:
          weatherLocation.textContent = 'An unknown error occurred.';
      }
    }
  );
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', fetchWeatherForecast);
const apiKey = 'e29b870ea5d804715e8cdb07295ad1b8'; // Weatherstack API key

// Function to get user's location and fetch weather data
async function fetchWeatherData() {
  const weatherLocation = document.getElementById('weatherLocation');
  const weatherDescription = document.getElementById('weatherDescription');
  const weatherTemp = document.getElementById('weatherTemp');

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
        // Fetch weather data using Weatherstack API
        const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        // Check for errors in the API response
        if (data.success === false) {
          weatherLocation.textContent = 'Unable to fetch weather data.';
          console.error('Weatherstack API error:', data.error.info);
          return;
        }

        // Update UI with weather data
        weatherLocation.textContent = `Location: ${data.location.name}, ${data.location.region}`;
        weatherDescription.textContent = `Weather: ${data.current.weather_descriptions[0]}`;
        weatherTemp.textContent = `Temperature: ${data.current.temperature}°C`;
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
document.addEventListener('DOMContentLoaded', fetchWeatherData);

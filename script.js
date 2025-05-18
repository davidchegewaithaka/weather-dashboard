const apiKey = "dbf1285a7a676467fcf13eb1828bbe31";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const loader = document.getElementById("loader");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  loader.style.display = "block"; // Show spinner
  document.getElementById("weatherInfo").style.opacity = 0.4; // Dim result card

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Invalid response");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temperature").textContent = data.main.temp;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("wind").textContent = data.wind.speed;

      // Calculate local time
      const timezoneOffset = data.timezone;
      const localTime = new Date(Date.now() + timezoneOffset * 1000);
      document.getElementById("localTime").textContent = localTime.toUTCString().replace("GMT", "");

      document.getElementById("weatherInfo").style.opacity = 1; // Restore visibility
    })
    .catch(error => {
      alert("Could not fetch weather. Please check the city name.");
      console.error("Error:", error);
    })
    .finally(() => {
      loader.style.display = "none"; // Always hide spinner
    });
}

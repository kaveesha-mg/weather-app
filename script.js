const apiKey = "be753d4c6f196215232ed4388d1f6971";

// Initialize
window.onload = function() {
  clearWeatherDisplay();
};

// Fetch weather
function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  if (!cityInput) {
    alert("Please enter a city name");
    return;
  }

  clearWeatherDisplay();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        const now = new Date();
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        document.getElementById("day").innerText = `${days[now.getDay()]}, ${now.toLocaleDateString()}`;
        document.getElementById("city").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

        // Precipitation
        let precipitation = "0 mm";
        if (data.rain) {
          precipitation = data.rain["1h"] ? `${data.rain["1h"]} mm` : data.rain["3h"] ? `${data.rain["3h"]} mm` : "0 mm";
        } else if (data.snow) {
          precipitation = data.snow["1h"] ? `${data.snow["1h"]} mm` : data.snow["3h"] ? `${data.snow["3h"]} mm` : "0 mm";
        }
        document.getElementById("precipitation").innerText = precipitation;

        // Weather icon
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description;
        weatherIcon.style.display = "inline-block";
      } else {
        alert("City not found. Please check spelling.");
      }
    })
    .catch(err => alert("Network or API error."));
}

// Clear display
function clearWeatherDisplay() {
  document.getElementById("day").innerText = "";
  document.getElementById("city").innerText = "";
  document.getElementById("temperature").innerText = "";
  document.getElementById("description").innerText = "";
  document.getElementById("humidity").innerText = "0%";
  document.getElementById("wind").innerText = "0 km/h";
  document.getElementById("precipitation").innerText = "0 mm";

  const weatherIcon = document.getElementById("weatherIcon");
  weatherIcon.style.display = "none";
  weatherIcon.src = "";
  weatherIcon.alt = "";
}

// Clear input
function clearInput() {
  document.getElementById("cityInput").value = "";
  clearWeatherDisplay();
  document.getElementById("cityInput").focus();
}

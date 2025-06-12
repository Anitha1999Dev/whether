import React, { useState } from "react";
import "./App.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const [weatherData, setWeatherData] = useState({
    name: "Chennai",
    main: {
      temp: 20,
      humidity: 56
    },
    wind: {
      speed: 15
    },
    weather: [
      {
        description: "Light Rain",
        icon: "10d"
      }
    ],
    cod: 200
  });

  const apiKey = "49e568fe25efaeb4e55b3bac433b9f61";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter the city name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>🔍</button>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : weatherData && weatherData.cod === 200 ? (
          <>
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
            <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
            <div className="city">{weatherData.name}</div>
            <div className="details">
              <div className="detail">
                <img src="https://img.icons8.com/ios/50/humidity.png" alt="humidity" />
                <p>{weatherData.main.humidity}%<br /><span>Humidity</span></p>
              </div>
              <div className="detail">
                <img src="https://img.icons8.com/ios/50/wind.png" alt="wind" />
                <p>{weatherData.wind.speed} km/h<br /><span>Wind</span></p>
              </div>
            </div>
          </>
        ) : (
          <p className="no-data">Enter a valid city to get weather info</p>
        )}
      </div>
    </div>
  );
}

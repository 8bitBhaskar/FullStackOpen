import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>temperature {weather.main.temp} Celcius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <div>wind {weather.wind.speed} m/s </div>
        </div>
      ) : null}
    </div>
  );
};

export default Weather;

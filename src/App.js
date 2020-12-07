import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateBuilder } from "./components/dateBuilder";

const api = {
  key: "66f625aefaa55ccc934ce85ea5227171",
  base: "https://api.openweathermap.org/data/2.5/",
  iconBase: "https://openweathermap.org/img/wn/",
};

const App = () => {
  const [weather, setWeather] = useState({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${api.base}weather?q=toronto&units=metric&appid=${api.key}`)
      .then((res) => {
        setWeather(res.data);
        setLoad(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
  }, []);

  //Return
  if (load) {
    return (
      <>
        {error ? (
          <h1>Error: {error}</h1>
        ) : (
          <div
            className={
              typeof weather.main != "undefined"
                ? weather.main.temp > 16
                  ? "app warm"
                  : "app"
                : "app"
            }
          >
            <div className="container">
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="description">{dateBuilder(new Date())}</div>
                  <br />
                  <div className="description">
                    {weather.weather[0].description}
                  </div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°c</div>
                </div>
                <div className="weather-box">
                  <div className="icon">
                    <img
                      src={`${api.iconBase}${weather.weather[0].icon}@2x.png`}
                      alt="Weather icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default App;

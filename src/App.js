import React, { useEffect, useState } from "react";

import "./App.css";
import { fetchWeather } from "./api/getWeather";

let deferredPrompt;

function App() {
  const [query, setQuery] = useState("");
  const [description, setDesc] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
      console.log(data.weather[0].description);
      switch (data.weather[0].description) {
        case "few clouds":
          setDesc("نیمه ابری");
          break;
        case "clear sky":
          setDesc("آسمان صاف");
          break;
        case "light rain":
          setDesc("کمی بارانی ");
          break;
        case "shower rain":
          setDesc("باران پراکنده");
          break;
        case "thunderstorm":
          setDesc("رعد و برق");
          break;
        case "snow":
          setDesc("برفی");
          break;
        case "mist":
          setDesc("مه آلود و دارای غبار");
          break;
        case "rain":
          setDesc("بارانی ");
          break;
        case "scattered clouds":
          setDesc("ابرهای پراکنده");
          break;
        case "broken clouds":
          setDesc("ابری");
          break;
        case "overcast clouds":
          setDesc("ابری");
          break;
        case "moderate rain":
          setDesc("بارش متوسط باران");
          break;
      }
    }
  };

  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    });
    window.addEventListener("appinstalled", () => {
      console.log("installed");
    });
  });

  const handleInstallClick = (e) => {
    setInstallable(false);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiseResult) => {
      if (choiseResult.outcome === "accepted") {
        console.log("user acceptedd");
      } else {
        console.log("user dissmised");
      }
    });
  };
  return (
    <div className="main-container">
      <h1 className="title">اپلیکیشن نمایش آب و هوا</h1>
      {installable && (
        <button className="btn-install" onClick={handleInstallClick}>
          برای نصب اپلیکشن کلیک کنید
        </button>
      )}
      <input
        type="text"
        placeholder="نام شهر دلخواه شما..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
        className="search"
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>{weather.weather[0].description}</p>
            <p className="description">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

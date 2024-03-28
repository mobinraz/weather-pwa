import React from "react";
import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "10245093a6d33340e30a0d8ff14aafc6";
const lat = "";
const lon = "";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      lon: lon,
      lat: lat,
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data;
};

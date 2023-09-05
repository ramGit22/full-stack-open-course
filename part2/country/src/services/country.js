import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;

const getAll = () => {
  return axios.get(baseUrl);
};

const getWeather = (selected) => {
  return axios.get(`${weatherUrl}&q=${selected}&aqi=no`);
};

export default { getAll: getAll, getWeather: getWeather };

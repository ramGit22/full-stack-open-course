import { useEffect, useState } from "react";
import countryServices from "./services/country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState();

  useEffect(() => {
    countryServices.getAll().then((response) => setCountries(response.data));
  }, []);

  console.log("filteredCountries", filteredCountries);

  useEffect(() => {
    const filteredResult = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filteredResult);
  }, [filter, countries]);

  useEffect(() => {
    if (filteredCountries.length > 0) {
      countryServices
        .getWeather(filteredCountries[0].capital[0])
        .then((response) => setWeather(response.data));
    }
  }, [filteredCountries]);

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  const displayCountry = (country) => {
    setSelected(country);
  };

  return (
    <div>
      find countries <input onChange={handleChange} />
      {filter && (
        <>
          {filteredCountries.length > 10 && <p>`too many countries`</p>}
          {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
            <ul>
              {filteredCountries.map((country, index) => (
                <div key={country.cioc || index}>
                  <li style={{ display: "inline-block" }}>
                    {country.name.common}
                  </li>{" "}
                  <button
                    style={{ display: "inline-block" }}
                    onClick={() => displayCountry(country)}
                  >
                    show
                  </button>
                </div>
              ))}
            </ul>
          )}

          {selected && (
            <div>
              <h1>{selected.name.common}</h1>
              <p>capital: {selected.capital}</p>
              <p>area: {selected.area}</p>
              <h2>Languages:</h2>
              <ul>
                {Object.values(selected.languages).map((lang, index) => (
                  <li key={selected.name.cioc || index}>{lang}</li>
                ))}
              </ul>
              <img
                src={selected.flags.svg}
                alt={selected.flags.alt}
                width="100px"
              />{" "}
            </div>
          )}

          {filteredCountries.length === 1 && (
            <div>
              <h1>{filteredCountries[0].name.common}</h1>
              <p>capital: {filteredCountries[0].capital}</p>
              <p>area: {filteredCountries[0].area}</p>

              <h2>Languages:</h2>
              <ul>
                {Object.values(filteredCountries[0].languages).map(
                  (lang, index) => (
                    <li key={filteredCountries[0].name.cioc || index}>
                      {lang}
                    </li>
                  )
                )}
              </ul>

              <img
                src={filteredCountries[0].flags.svg}
                alt={filteredCountries[0].flags.alt}
                width="100px"
              />

              <h1>weather in {filteredCountries[0].capital[0]}</h1>
              <p>Temperature {weather.current.temp_c} Celcius </p>
              <img src=" https://openweathermap.org/img/wn/10d@2x.png" />
              <p>Wind {weather.current.wind_kph} km/hr</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

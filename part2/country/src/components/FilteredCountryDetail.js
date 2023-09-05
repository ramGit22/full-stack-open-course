import React from "react";

const FilteredCountryDetail = ({ filteredCountries, weather }) => {
  return (
    <div>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>capital: {filteredCountries[0].capital}</p>
      <p>area: {filteredCountries[0].area}</p>

      <h2>Languages:</h2>
      <ul>
        {Object.values(filteredCountries[0].languages).map((lang, index) => (
          <li key={filteredCountries[0].name.cioc || index}>{lang}</li>
        ))}
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
  );
};

export default FilteredCountryDetail;

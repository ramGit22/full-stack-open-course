import React from "react";

const FilteredCountryDetail = ({ filteredCountries, weather }) => {
  if (!filteredCountries.length || !weather) {
    return <p>No data available</p>;
  }

  const { name, capital, area, languages, flags } = filteredCountries[0];
  const { current } = weather;

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(languages).map((lang, index) => (
          <li key={name.cioc || index}>{lang}</li>
        ))}
      </ul>
      <img src={flags.svg} alt={flags.alt} width="100px" />
      <h1>weather in {capital[0]}</h1>
      <p>Temperature {current.temp_c} Celcius </p>
      <img src="https://openweathermap.org/img/wn/10d@2x.png" />
      <p>Wind {current.wind_kph} km/hr</p>
    </div>
  );
};

export default FilteredCountryDetail;

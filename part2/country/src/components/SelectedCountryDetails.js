import React from "react";

const SelectedCountryDetails = ({ selected }) => {
  const { name, capital, area, languages, flags } = selected;
  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h2>Languages:</h2>{" "}
      <ul>
        {Object.values(languages).map((lang, index) => (
          <li key={name.cioc || index}>{lang}</li>
        ))}
      </ul>
      <img src={flags.svg} alt={flags.alt} width="100px" />{" "}
    </div>
  );
};

export default SelectedCountryDetails;

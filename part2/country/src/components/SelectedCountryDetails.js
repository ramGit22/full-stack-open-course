import React from "react";

const SelectedCountryDetails = ({ selected }) => {
  return (
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
      <img src={selected.flags.svg} alt={selected.flags.alt} width="100px" />{" "}
    </div>
  );
};

export default SelectedCountryDetails;

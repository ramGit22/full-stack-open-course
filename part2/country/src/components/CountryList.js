import React from "react";

const CountryList = ({ filteredCountries, displayCountry }) => {
  return (
    <ul>
      {filteredCountries.map((country, index) => (
        <div key={country.cioc || index}>
          <li style={{ display: "inline-block" }}>{country.name.common}</li>{" "}
          <button
            style={{ display: "inline-block" }}
            onClick={() => displayCountry(country)}
          >
            show
          </button>
        </div>
      ))}
    </ul>
  );
};

export default CountryList;

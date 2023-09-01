import { useEffect, useState } from "react";
import countryServices from "./services/country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

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

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      find countries <input onChange={handleChange} />
      {filter && (
        <>
          {filteredCountries.length > 10 && <p>`too many countries`</p>}
          {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
            <ul>
              {filteredCountries.map((country) => (
                <li key={country.name.common}>{country.name.common}</li>
              ))}
            </ul>
          )}

          {filteredCountries.length === 1 && (
            <div>
              <h1>{filteredCountries[0].name.common}</h1>
              <p>capital: {filteredCountries[0].capital}</p>
              <p>area: {filteredCountries[0].area}</p>

              <h2>Languages:</h2>
              <ul>
                {Object.values(filteredCountries[0].languages).map((lang) => (
                  <li key={filteredCountries[0].name.common}>{lang}</li>
                ))}
              </ul>

              <img
                src={filteredCountries[0].flags.svg}
                alt={filteredCountries[0].flags.alt}
                width="100px"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

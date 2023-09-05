import { useEffect, useState } from "react";
import countryServices from "./services/country";
import FilterComponent from "./components/FilterComponent";
import CountryList from "./components/CountryList";
import SelectedCountryDetails from "./components/SelectedCountryDetails";
import FilteredCountryDetail from "./components/FilteredCountryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState();

  useEffect(() => {
    countryServices.getAll().then((response) => setCountries(response.data));
  }, []);

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
  };

  const displayCountry = (country) => {
    setSelected(country);
  };

  return (
    <div>
      <FilterComponent handleChange={handleChange} />
      {filter && (
        <>
          {filteredCountries.length > 10 && <p>`too many countries`</p>}
          {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
            <CountryList
              filteredCountries={filteredCountries}
              displayCountry={displayCountry}
            />
          )}

          {selected && <SelectedCountryDetails selected={selected} />}

          {filteredCountries.length === 1 && (
            <FilteredCountryDetail
              filteredCountries={filteredCountries}
              weather={weather}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

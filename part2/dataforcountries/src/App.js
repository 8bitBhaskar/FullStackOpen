import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import CountryInfo from "./components/CountryInfo";
import axios from "axios";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  };

  useEffect(hook, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />

      {countriesToShow.length === 1 ? (
        <CountryInfo country={countriesToShow[0]} />
      ) : null}

      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter </div>
      ) : (
        <Countries
          countriesToShow={countriesToShow}
          setCountriesToShow={setCountriesToShow}
        />
      )}
    </div>
  );
};

export default App;

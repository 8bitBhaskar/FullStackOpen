import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        width="15%"
        height="15%"
      />
      <Weather city={country.capital} />
    </div>
  );
};

export default CountryInfo;

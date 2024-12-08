import axios from "axios";
import { useEffect, useState } from "react";

const api_key = import.meta.env.VITE_SOME_KEY

const ExercisesDataForCountries = () => {
  // https://studies.cs.helsinki.fi/restcountries/api/all
  // https://studies.cs.helsinki.fi/restcountries/api/name/{name}
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  // useEffect(() => {
  //   if (search) {
  //     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${search}`).then((response) => {
  //       setSearchCountries(response.data)
  //     })
  //   }
  // }, [search])

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase()
    const filterCountry = countries.filter((country) => country.name.common.toLowerCase().includes(value))
    setSearchCountries(value ? filterCountry : [])
  }

  const handleShow = (name) => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then((response) => {
      setSearchCountries([response.data])
      handleWeather(response.data.capital)
    })
  }

  const handleWeather = (country) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}`).then((response) => {
      setWeather(response.data)
    })
  }

  return (
    <div>
      find countries <input name="search" onChange={handleSearch} />
      {
        searchCountries.length > 10
        ? <div>Too many matches, specify another filter</div>
        : searchCountries.length === 1 
        ? <div>
          {
            searchCountries.map((country, index) => (
              <div key={index}>
                <h1>{country.name.common}</h1>
                <div>
                  capital {country.capital} <br />
                  area {country.area}
                </div>
                <div>
                  <h3>languages:</h3>
                  <ul>
                    {
                      Object.values(country.languages).map((language, index) => (
                        <li key={index}>
                          {language}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div>
                  <span className="emoji-flag">{country.flag}</span>
                  {country.coatOfArms.svg ? (
                    <img src={country.coatOfArms.svg} alt="flag" width={120} />
                  ) : null }
                </div>
                <div>
                  <h1>Weather in {country.capital}</h1>
                  <div>
                    <p>temperature {weather?.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather icon" width={100} height={100} />
                    <p>Wind {weather?.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        : searchCountries.map((country, index) => (
          <div key={index}>
            {country.name.common} 
            <button onClick={() => handleShow(country.name.common)}>show</button>
          </div>
        ))
      }
    </div>
  )
}

export default ExercisesDataForCountries
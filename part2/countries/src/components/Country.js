import React,{ useState} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [show, setShow] = useState(
  false) 
  const [weather, setWeather] = useState(
  [{}]) 
  const showing = () => {
    setShow(true)
    axios
    .get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.name)
    .then(response => {
    console.log(response.data)
    setWeather(response.data.current)
    })
  }
  if (show){
    return (
    <div>
      <h1> {country.name} </h1>
      <div> capital: {country.capital} </div>
      <div> population: {country.population}</div>
      <h2> languages </h2>
      <ul>
      {country.languages.map(part => 
      <li key={part.name.id}> {part.name} </li>
      )} 
      </ul>
      <img src={country.flag}></img>
      <div> </div>
      <div> temperature: {weather.temperature} </div>
      <img src={weather.weather_icons}></img>
      <div> windspeed: {weather.wind_speed} </div>
    </div>
    )
  }

  return (
    <div>
        <span> {country.name} </span>
        <button onClick={showing}> show </button>
    </div>
  )
}
export default Country
import React, { useState} from 'react'
import Country from './Country'
import axios from 'axios'
const Filter = (props) => {
    // ...
    return(
        <form onSubmit = {props.addFilter}>
            <div>
                filter shown with: <input value = {props.filt} onChange = {props.handleFilt} />
            </div>
        </form>
    )
}
const Countries = (props) => {
    // ...
    return(
        <ul>
            {props.namesToShow.map((country, i) => 
            <Country key={i} country = {country} />
            )}
        </ul>
    )
}
const App = () => {
    const [countries, setCountries] = useState([{}]) 
    const getName = (name) => {
        axios
            .get('https://restcountries.eu/rest/v2/name/' + name)
            .then(response => {
            setCountries(response.data)
            })
    }
    const [filt,setFilt] = useState('')
    const [showAll, setShowAll] = useState(true)
    const addFilter = (event) => {
        // event.preventDefault()
        // setShowAll(false)
    }
    const handleFilterChange = (event) => {
        setFilt(event.target.value)
        getName(event.target.value)
    }

    const namesToShow = showAll
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(filt.toLowerCase()))

    return (
        <div>
            <h2> Countries </h2>
            <Filter handleFilt = {handleFilterChange} filt = {filt} addFilter = {addFilter}/>
            <Countries namesToShow = {namesToShow}/>
        </div>
    )
}

export default App